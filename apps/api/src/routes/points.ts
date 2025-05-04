// apps/api/src/routes/points.ts

import { Router, Request, Response, NextFunction } from "express";
import { Point } from "../models/point";

const router = Router();

/**
 * GET /points
 * ポイント残高と履歴を取得
 */
router.get(
  "/",
  async (_req: Request, res: Response, _next: NextFunction): Promise<void> => {
    let pts = await Point.findOne();
    if (!pts) {
      pts = new Point();
      await pts.save();
    }
    res.status(200).json(pts);
  }
);

/**
 * POST /points/change
 * ポイントを増減する
 * body: { change: number, reason: string }
 */
router.post(
  "/change",
  async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
    const { change, reason } = req.body as {
      change: number;
      reason: string;
    };
    const pts = (await Point.findOne()) || new Point();
    pts.total = Math.max(0, pts.total + change);
    pts.history.push({ change, reason, date: new Date() });
    await pts.save();
    res.status(200).json(pts);
  }
);

export default router;
