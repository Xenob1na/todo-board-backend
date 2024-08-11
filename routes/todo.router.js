import express from "express";

import {
  getTodos,
  getTodosById,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.controller.js";

import { verifyToken } from "../middlewares/checkToken.js";

const router = express.Router();

router.get("/todos", verifyToken, getTodos);
router.get("/todos/:id", verifyToken, getTodosById);
router.post("/todos", verifyToken, createTodo);
router.put("/todos/:id", verifyToken, updateTodo);
router.delete("/todos/:id", verifyToken, deleteTodo);

export default router;
