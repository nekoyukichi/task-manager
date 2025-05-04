// apps/api/src/server.ts

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import tasksRouter from "./routes/tasks";  // ここを確認！

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB 接続
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/task-manager";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// ヘルスチェック
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// ← ここで /tasks に router を登録
app.use("/tasks", tasksRouter);

// エラーハンドリング
app.use((err: any, _req: any, res: any, _next: any) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
