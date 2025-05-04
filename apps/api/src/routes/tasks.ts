// apps/api/src/routes/tasks.ts

import { Router, Request, Response, NextFunction } from "express";
import { Task } from "../models/task";

const router = Router();

/**
 * GET /tasks
 * タスク一覧を取得する
 */
router.get(
  "/",
  async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
    try {
      const tasks = await Task.find().sort({ createdAt: -1 });
      res.status(200).json(tasks);
    } catch (err) {
      _next(err);
    }
  }
);

/**
 * POST /tasks
 * 新しいタスクを作成する
 */
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

/**
 * PATCH /tasks/:id
 * 指定IDのタスクを更新する
 */
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
        return;  // ここで戻る
      }
      res.status(200).json(updated);
    } catch (err) {
      _next(err);
    }
  }
);

/**
 * DELETE /tasks/:id
 * 指定IDのタスクを削除する
 */
router.delete(
  "/:id",
  async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
    try {
      const deleted = await Task.findByIdAndDelete(req.params.id);
      if (!deleted) {
        res.status(404).json({ message: "Task not found" });
        return;  // ここで戻る
      }
      res.status(204).end();
    } catch (err) {
      _next(err);
    }
  }
);

export default router;
