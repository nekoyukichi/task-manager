// apps/api/src/routes/items.ts

import { Router, Request, Response, NextFunction } from "express";
import { Item } from "../models/item";
import { Point } from "../models/point";

const router = Router();

/** GET /items - 商品一覧を返す */
router.get(
  "/",
  async (
    _req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<void> => {
    try {
      const items = await Item.find();
      res.status(200).json(items);
    } catch (err) {
      _next(err);
    }
  }
);

/** POST /items/purchase - 購入処理 */
router.post(
  "/purchase",
  async (
    req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<void> => {
    try {
      const { itemId } = req.body as { itemId: string };
      const item = await Item.findById(itemId);
      if (!item) {
        res.status(404).json({ message: "Item not found" });
        return;
      }

      const pts = (await Point.findOne()) || new Point();
      if (pts.total < item.price) {
        res.status(400).json({ message: "ポイントが不足しています" });
        return;
      }

      // ポイントを減らす
      pts.total -= item.price;
      pts.history.push({
        change: -item.price,
        reason: `購入: ${item.name}`,
        date: new Date(),
      });
      await pts.save();

      res.status(200).json({ success: true, remaining: pts.total });
    } catch (err) {
      _next(err);
    }
  }
);

export default router;
