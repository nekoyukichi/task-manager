// apps/api/src/server.ts

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

// 既存ルート
import tasksRouter from "./routes/tasks";
import pointsRouter from "./routes/points";
// ここにアイテムルートを追加します
import itemsRouter from "./routes/items";

const app = express();

// ミドルウェア
app.use(cors());
app.use(express.json());

// MongoDB 接続設定
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/task-manager";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// ヘルスチェック用エンドポイント
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// 既存の API ルート
app.use("/tasks", tasksRouter);
app.use("/points", pointsRouter);

// 新しいストア用ルートをここでマウント！
app.use("/items", itemsRouter);

// エラーハンドリング
app.use((err: any, _req: any, res: any, _next: any) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
});

// サーバ起動
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
