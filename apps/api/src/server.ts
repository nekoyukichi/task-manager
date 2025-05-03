import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// 🚥 ヘルスチェック用エンドポイント
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
