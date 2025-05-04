// apps/api/src/models/task.ts
import { Schema, model, Document } from "mongoose";

// Taskドキュメントの型
export interface ITask extends Document {
  title: string;
  description?: string;
  dueDate?: Date;
  completedAt?: Date;
  status: "pending" | "done";
}

// スキーマ定義
const TaskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date },
    completedAt: { type: Date },
    status: { type: String, enum: ["pending", "done"], default: "pending" },
  },
  { timestamps: true }
);

// モデル作成
export const Task = model<ITask>("Task", TaskSchema);
