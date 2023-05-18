import express from "express";
import {
  deleteMyTask,
  getMyTask,
  newTask,
  UpdateMyTask,
} from "../controllers/tasks.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", isAuthenticated, newTask);

router.get("/my", isAuthenticated, getMyTask);

router
  .route("/:id")
  .put(isAuthenticated, UpdateMyTask)
  .delete(isAuthenticated, deleteMyTask);

export default router;

