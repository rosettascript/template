import { Pool } from 'pg';
import { config } from '../../config';
import { logger } from '../../utils/logger';
import bcrypt from 'bcryptjs';

const pool = new Pool({
  user: config.database.user,
  host: config.database.host,
  database: config.database.database,
  password: config.database.password,
  port: config.database.port,
  ssl: config.database.ssl
});

async function runSeeds(): Promise<void> {
  const client = await pool.connect();
  
  try {
    logger.info('Starting database seeding...');

    // Check if already seeded
    const checkResult = await client.query(`
      SELECT value FROM user_metadata 
      WHERE key = 'seeded' AND namespace = 'system'
    `);

    if (checkResult.rows.length > 0) {
      logger.info('Database already seeded, skipping...');
      return;
    }

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', config.bcrypt.rounds);
    const adminResult = await client.query(`
      INSERT INTO users (email, password_hash, status, email_verified_at)
      VALUES ($1, $2, 'active', CURRENT_TIMESTAMP)
      RETURNING id
    `, ['rosettascript@gmail.com', adminPassword]);

    const adminId = adminResult.rows[0].id;

    // Create admin profile
    await client.query(`
      INSERT INTO user_profiles (user_id, first_name, last_name, display_name)
      VALUES ($1, 'Admin', 'User', 'Administrator')
    `, [adminId]);

    // Assign admin role
    const adminRoleResult = await client.query(`
      SELECT id FROM roles WHERE name = 'admin'
    `);
    
    if (adminRoleResult.rows.length > 0) {
      await client.query(`
        INSERT INTO user_roles (user_id, role_id)
        VALUES ($1, $2)
      `, [adminId, adminRoleResult.rows[0].id]);
    }

    // Create test user
    const testPassword = await bcrypt.hash('test123', config.bcrypt.rounds);
    const testResult = await client.query(`
      INSERT INTO users (email, password_hash, status, email_verified_at)
      VALUES ($1, $2, 'active', CURRENT_TIMESTAMP)
      RETURNING id
    `, ['test@template.com', testPassword]);

    const testId = testResult.rows[0].id;

    // Create test profile
    await client.query(`
      INSERT INTO user_profiles (user_id, first_name, last_name, display_name)
      VALUES ($1, 'Test', 'User', 'Test User')
    `, [testId]);

    // Assign user role
    const userRoleResult = await client.query(`
      SELECT id FROM roles WHERE name = 'user'
    `);
    
    if (userRoleResult.rows.length > 0) {
      await client.query(`
        INSERT INTO user_roles (user_id, role_id)
        VALUES ($1, $2)
      `, [testId, userRoleResult.rows[0].id]);
    }

    // Mark as seeded
    await client.query(`
      INSERT INTO user_metadata (user_id, key, value, namespace)
      VALUES ($1, 'seeded', 'true', 'system')
    `, [adminId]);

    logger.info('✓ Admin user created: rosettascript@gmail.com / admin123');
    logger.info('✓ Test user created: test@template.com / test123');
    logger.info('Database seeding completed successfully');
  } catch (error) {
    logger.error('Seeding failed:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

// Run seeds if this file is executed directly
if (require.main === module) {
  runSeeds()
    .then(() => {
      logger.info('Seeding process completed');
      process.exit(0);
    })
    .catch((error) => {
      logger.error('Seeding process failed:', error);
      process.exit(1);
    });
}

export { runSeeds };