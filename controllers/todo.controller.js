import { Todo } from "../models/todo.model.js";

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.status(200).json({
      success: true,
      data: todos,
      message: "todos fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};

export const getTodosById = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findOne({ where: { id } });
    res.status(200).json({
      success: true,
      data: todo,
      message: "todo fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};

export const createTodo = async (req, res) => {
  const { title, body } = req.body;
  console.log(req.body)
  try {
    await Todo.create({ title, body });
    res.status(201).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.update(req.body, { where: { id } });
    res.status(200).json({
      success: true,
      data: todo,
      message: "todo updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.destroy({ where: { id } });
    res.status(200).json({
      success: true,
      data: todo,
      message: "todo deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};
