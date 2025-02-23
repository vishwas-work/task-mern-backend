import asyncHandler from "express-async-handler";
import queryDb from "../connect/dbHelper.js";

const taskController = {
  getTask: asyncHandler(async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    console.log(req.user);
    // get id from token
    // const id=

    const tasks = await queryDb("SELECT * FROM tasks where user_id=?", [
      req.user?.id,
    ]);
    // console.log(tasks);

    res.status(200).json(tasks);
  }),

  createTask: asyncHandler(async (req, res) => {
    // console.log(req.body.task);
    const taskIs = req.body?.task;

    const createTask = await queryDb(
      "INSERT INTO tasks (`user_id`,`task`)VALUE(?,?)",
      [req.user?.id, taskIs]
    );
    if (createTask.affectedRows) {
      res.status(200).json({ message: "task creating sussfully" });
    } else {
      res.status(400).send("Something went wrong");
    }
  }),
  deleteTask: asyncHandler(async (req, res) => {
    const { id } = req.params; // Get the ID from the URL

    if (!id) {
      return res.status(400).json({ message: "Task ID is required" });
    }

    // Assuming `Task` is your database model (MongoDB, SQL, etc.)
    const deletedTask = await queryDb("DELETE FROM tasks WHERE tasks_id = ?", [
      id,
    ]);
    // console.log(deletedTask);

    if (!deletedTask.affectedRows) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: `Task ${id} deleted successfully` });
  }),
};

export default taskController;
