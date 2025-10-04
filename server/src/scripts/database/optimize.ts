import { Pool } from 'pg';
import { config } from '../../config';
import { logger } from '../../utils/logger';

const pool = new Pool({
  user: config.database.user,
  host: config.database.host,
  database: config.database.database,
  password: config.database.password,
  port: config.database.port,
  ssl: config.database.ssl
});

async function runOptimization(): Promise<void> {
  const client = await pool.connect();
  
  try {
    logger.info('Starting database optimization...');

    // Update table statistics
    await client.query('ANALYZE');
    logger.info('✓ Table statistics updated');

    // Vacuum database
    await client.query('VACUUM ANALYZE');
    logger.info('✓ Database vacuumed and analyzed');

    // Check for unused indexes
    const unusedIndexes = await client.query(`
      SELECT schemaname, tablename, indexname, idx_scan, idx_tup_read, idx_tup_fetch
      FROM pg_stat_user_indexes
      WHERE idx_scan = 0 AND schemaname = 'public'
      ORDER BY schemaname, tablename, indexname
    `);

    if (unusedIndexes.rows.length > 0) {
      logger.warn('⚠ Unused indexes found:');
      unusedIndexes.rows.forEach(row => {
        logger.warn(`  - ${row.schemaname}.${row.tablename}.${row.indexname}`);
      });
    } else {
      logger.info('✓ No unused indexes found');
    }

    // Check table sizes
    const tableSizes = await client.query(`
      SELECT 
        schemaname,
        tablename,
        pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
      FROM pg_tables 
      WHERE schemaname = 'public'
      ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC
    `);

    logger.info('📊 Table sizes:');
    tableSizes.rows.forEach(row => {
      logger.info(`  - ${row.tablename}: ${row.size}`);
    });

    logger.info('Database optimization completed successfully');
  } catch (error) {
    logger.error('Optimization failed:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

// Run optimization if this file is executed directly
if (require.main === module) {
  runOptimization()
    .then(() => {
      logger.info('Optimization process completed');
      process.exit(0);
    })
    .catch((error) => {
      logger.error('Optimization process failed:', error);
      process.exit(1);
    });
}

export { runOptimization };