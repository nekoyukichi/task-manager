// apps/api/src/routes/tasks.ts

import { Router, Request, Response, NextFunction } from "express";
import { Task } from "../models/task";
import { Point } from "../models/point";

const router = Router();

/** GET /tasks */
router.get(
  "/",
  async (_req: Request, res: Response, _next: NextFunction): Promise<void> => {
    try {
      const tasks = await Task.find().sort({ createdAt: -1 });
      res.status(200).json(tasks);
    } catch (err) {
      _next(err);
    }
  }
);

/** POST /tasks */
router.post(
  "/",
  async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
    try {
      const { title, description, dueDate } = req.body;
      const task = new Task({ title, description, dueDate });
      await task.save();
      res.status(201).json(task);
    } catch (err) {
      _next(err);
    }
  }
);

/** PATCH /tasks/:id */
router.patch(
  "/:id",
  async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
    try {
      const updated = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updated) {
        res.status(404).json({ message: "Task not found" });
        return;
      }
      // 完了ステータス「done」なら +10pt
      if (req.body.status === "done") {
        const pts = (await Point.findOne()) || new Point();
        pts.total += 10;
        pts.history.push({ change: 10, reason: "タスク完了", date: new Date() });
        await pts.save();
      }
      res.status(200).json(updated);
    } catch (err) {
      _next(err);
    }
  }
);

/** DELETE /tasks/:id */
router.delete(
  "/:id",
  async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
    try {
      const deleted = await Task.findByIdAndDelete(req.params.id);
      if (!deleted) {
        res.status(404).json({ message: "Task not found" });
        return;
      }
      res.status(204).end();
    } catch (err) {
      _next(err);
    }
  }
);

export default router;
