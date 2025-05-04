// apps/api/src/models/point.ts

import { Schema, model, Document } from "mongoose";

export interface IPoint extends Document {
  total: number;
  history: {
    change: number;
    reason: string;
    date: Date;
  }[];
}

const PointSchema = new Schema<IPoint>(
  {
    total: { type: Number, default: 0 },
    history: [
      {
        change: { type: Number, required: true },
        reason: { type: String, required: true },
        date: { type: Date, default: () => new Date() },
      },
    ],
  },
  { timestamps: true }
);

export const Point = model<IPoint>("Point", PointSchema);
