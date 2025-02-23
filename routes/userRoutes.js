import express from "express";

import userController from "../controllers/userController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// router.get("/", taskController.getTask);

router.post("/", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/current", protect, userController.getCurrentUser);

export default router;
