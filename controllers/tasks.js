import ErrorHandler from "../middlewares/error.js";
import { Tasks } from "../models/tasks.js";

export const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    await Tasks.create({
      title,
      description,
      user: req.user,
    });

    res.status(201).json({
      success: true,
      message: "Tasks Created Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getMyTask = async (req, res, next) => {
  try {
    const userID = req.user._id;
    const tasks = await Tasks.find({ user: userID });

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const UpdateMyTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Tasks.findById(id);

    if (!task) return next(new ErrorHandler("Invalid Id"));

    task.isCompleted = !task.isCompleted;
    await task.save();

    res.status(200).json({
      success: true,
      message: "Task Updated",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMyTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Tasks.findById(id);

    if (!task) return next(new ErrorHandler("InvalidID", 404));

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task Deleted",
    });
  } catch (error) {
    next(error);
  }
};
