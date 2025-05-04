// apps/api/src/models/item.ts

import { Schema, model, Document } from "mongoose";

export interface IItem extends Document {
  name: string;
  price: number;       // 必要ポイント
  description?: string;
  icon?: string;       // アイコンURL (あれば)
}

const ItemSchema = new Schema<IItem>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    icon: { type: String },
  },
  { timestamps: true }
);

export const Item = model<IItem>("Item", ItemSchema);
