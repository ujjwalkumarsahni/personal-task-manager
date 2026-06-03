import express from "express";
import { body } from "express-validator";
const router = express.Router();

import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskCompletion,
  updateTaskOrder,
  getTaskStats,
} from "../controllers/taskController.js";

// Validation rules
const taskValidation = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .trim()
    .isLength({ max: 200 })
    .withMessage("Title cannot exceed 200 characters"),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description cannot exceed 1000 characters"),
  body("dueDate").optional().isISO8601().withMessage("Invalid date format"),
];

// Routes
router.get("/", getTasks);
router.get("/stats", getTaskStats);
router.get("/:id", getTaskById);
router.post("/", taskValidation, createTask);
router.put("/:id", taskValidation, updateTask);
router.patch("/:id/toggle", toggleTaskCompletion);
router.patch("/:id/order", updateTaskOrder);
router.delete("/:id", deleteTask);

export default router;
