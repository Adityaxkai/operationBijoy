import { Pool } from 'pg';
import fs from 'fs';

const pool = new Pool({
  connectionString: "postgresql://neondb_owner:npg_7xsNiuA4wJZX@ep-calm-smoke-a8wfmc3z-pooler.eastus2.azure.neon.tech/neondb?sslmode=require"
});

async function runMigration() {
  const client = await pool.connect();
  try {
    const sql = fs.readFileSync('modified_test.sql', 'utf8');
    await client.query(sql);
    console.log('✅ Migration completed successfully');
  } catch (err) {
    console.error('❌ Migration failed:', err);
  } finally {
    client.release();
    await pool.end();
  }
}

runMigration();