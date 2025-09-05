import mysql, { Pool, PoolConnection } from 'mysql2/promise';

const DB_NAME = process.env.DB_NAME || 'school_management';

const baseConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  port: parseInt(process.env.DB_PORT || '3306'),
};

let pool: Pool | null = null;

export function getPool(): Pool {
  if (!pool) {
    pool = mysql.createPool({
      ...baseConfig,
      database: DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return pool;
}

export async function initDatabase(): Promise<void> {
  // First connect WITHOUT specifying a database so we can create it if missing
  const rootConnection = await mysql.createConnection(baseConfig);
  try {
    await rootConnection.execute(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
  } finally {
    await rootConnection.end();
  }

  // Ensure pool is created after DB exists
  getPool();

  // Create required tables
  const conn: PoolConnection = await getPool().getConnection();
  try {
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS schools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name TEXT NOT NULL,
        address TEXT NOT NULL,
        city TEXT NOT NULL,
        state TEXT NOT NULL,
        contact VARCHAR(15) NOT NULL,
        image TEXT,
        email_id VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
  } finally {
    conn.release();
  }
}
