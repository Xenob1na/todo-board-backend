import express from "express";

import {
  getTodos,
  getTodosById,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.controller.js";

const router = express.Router();

router.get("/todos", getTodos);
router.get("/todos/:id", getTodosById);
router.post("/todos", createTodo);
router.put("/todos/:id", updateTodo);
router.delete("/todos/:id", deleteTodo);

export default router;
