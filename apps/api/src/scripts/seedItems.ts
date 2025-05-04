// apps/api/src/scripts/seedItems.ts
import mongoose from "mongoose";
import { Item } from "../models/item";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/task-manager";

async function main() {
  await mongoose.connect(MONGO_URI);
  console.log("✔️ Connected to MongoDB");

  const itemsData = [
    { name: "テーマカラー: ネオン", price: 50, description: "画面がネオンに変わります" },
    { name: "花火エフェクト",     price:100, description: "完了時に花火が上がります" },
  ];

  // 既存データをクリア（必要なければコメントアウト）
  await Item.deleteMany({});
  const created = await Item.insertMany(itemsData);
  console.log(`🛍️ Seeded ${created.length} items`);

  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
