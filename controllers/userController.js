import asyncHandler from "express-async-handler";
import queryDb from "../connect/dbHelper.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import protect from "../middleware/authMiddleware.js";

const userController = {
  registerUser: asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please add all fields");
    }

    // check user exit
    const UserExit = await queryDb("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (UserExit.length > 0) {
      res.status(400);
      throw new Error("User already exists");
    }

    const hasPassword = await bcrypt.hash(password, 10);

    const User = await queryDb(
      "insert into users (`name`,`password`,email) value(?,?,?)",
      [name, hasPassword, email]
    );

    if (User.insertId) {
      const token = jwt.sign({ id: User.insertId }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
      res.status(200).json({ user_id: User.insertId, name, email, token });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }),

  loginUser: asyncHandler(async (req, res) => {
    const { password, email } = req.body;

    if (!password || !email) {
      res.status(400);
      throw new Error("Please add all fields");
    }

    // check user exit

    const user = await queryDb("SELECT * FROM users WHERE email = ? limit 1", [
      email,
    ]);
    // console.log(user[0]);

    if (user.length > 0 && (await bcrypt.compare(password, user[0].password))) {
      res.status(200).json({
        name: user[0].name,
        email: user[0].email,
        userId: user[0].id,
        token: jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, {
          expiresIn: "30d",
        }),
        message: "user login",
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }),

  getCurrentUser: asyncHandler(async (req, res) => {
    res.status(200).json({ message: "वर्तमान उपयोगकर्ता डेटा" });
  }),
};

export default userController;
