import mysql from "mysql2/promise"; // Use promise-based MySQL2
import dotenv from "dotenv";
dotenv.config();
// ✅ Create a MySQL connection pool
const db = mysql.createPool({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// ✅ Function to test database connection
const testDbConnection = async () => {
  try {
    const connection = await db.getConnection();
    console.log("✅ Connected to MySQL successfully!");
    connection.release();
  } catch (err) {
    console.error("❌ Database connection failed:", err);
  }
};

// ✅ Call test connection
testDbConnection();

export default db;
