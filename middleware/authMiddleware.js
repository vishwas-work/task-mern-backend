import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

import queryDb from "../connect/dbHelper.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  //   console.log(req.headers);

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      const user = await queryDb(
        "SELECT name,email,id FROM users WHERE id = ?",
        [decoded.id]
      );

      if (user.length === 0) {
        res.status(401);
        throw new Error("User not found");
      }

      req.user = user[0];
      // console.log(req.user);

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export default protect;
