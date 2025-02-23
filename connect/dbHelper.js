import db from "./database.js";

// ✅ Helper function for database queries
const queryDb = async (sql, params = []) => {
  try {
    const [rows] = await db.execute(sql, params); // Use `execute()`
    return rows;
  } catch (error) {
    console.error("❌ MySQL Query Error:", error);
    throw error;
  }
};

export default queryDb;
