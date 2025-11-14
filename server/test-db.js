import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'signalforge',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
});

async function testConnection() {
  try {
    console.log('🔍 Testing database connection...');
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Database connection successful!');
    console.log('📅 Server time:', result.rows[0].now);
    
    // Test if database exists and is accessible
    const dbResult = await pool.query('SELECT current_database()');
    console.log('📊 Connected to database:', dbResult.rows[0].current_database);
    
    await pool.end();
    console.log('✅ All tests passed! Database is ready.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error('\n💡 Troubleshooting:');
    console.error('1. Make sure PostgreSQL is running');
    console.error('2. Verify database "signalforge" exists');
    console.error('3. Check your credentials in server/.env');
    process.exit(1);
  }
}

testConnection();

