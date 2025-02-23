import dotenv from "dotenv";
dotenv.config(); // Load environment variables first

import express from "express";
import cors from "cors";
import taskRoutes from "./routes/taskRoute.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";
import queryDb from "./connect/dbHelper.js";

const app = express();

// ✅ Check database connection

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Home Page");
});

// Error Handling Middleware
app.use(errorHandler);

// get data from table

// Start the server
const PORT = process.env.PORT || 3000; // ✅ Correct way to set PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
