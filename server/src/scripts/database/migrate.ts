import { Pool } from 'pg';
import { config } from '../../config';
import { logger } from '../../utils/logger';
import fs from 'fs';
import path from 'path';

const pool = new Pool({
  user: config.database.user,
  host: config.database.host,
  database: config.database.database,
  password: config.database.password,
  port: config.database.port,
  ssl: config.database.ssl
});

async function runMigration(): Promise<void> {
  const client = await pool.connect();
  
  try {
    logger.info('Starting database migration...');

    // Read and execute SQL files in order
    const sqlFiles = [
      'extensions.sql',
      'main-schema.sql',
      'functions.sql',
      'triggers.sql',
      'indexes.sql',
      'inserts.sql',
      'procedures.sql'
    ];

    for (const fileName of sqlFiles) {
      const filePath = path.join(__dirname, '..', 'database', fileName);
      
      if (fs.existsSync(filePath)) {
        logger.info(`Executing ${fileName}...`);
        const sql = fs.readFileSync(filePath, 'utf8');
        
        if (sql.trim()) {
          await client.query(sql);
          logger.info(`✓ ${fileName} executed successfully`);
        } else {
          logger.info(`- ${fileName} is empty, skipping`);
        }
      } else {
        logger.warn(`⚠ ${fileName} not found, skipping`);
      }
    }

    logger.info('Database migration completed successfully');
  } catch (error) {
    logger.error('Migration failed:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

// Run migration if this file is executed directly
if (require.main === module) {
  runMigration()
    .then(() => {
      logger.info('Migration process completed');
      process.exit(0);
    })
    .catch((error) => {
      logger.error('Migration process failed:', error);
      process.exit(1);
    });
}

export { runMigration };