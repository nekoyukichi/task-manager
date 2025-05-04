// apps/web/src/services/api.ts

import axios from "axios";

// タスクデータの型定義
export interface Task {
  _id: string;
  title: string;
  description?: string;
  dueDate?: string;
  completedAt?: string;
  status: "pending" | "done";
}

// Axios インスタンスを作成
const API = axios.create({
  baseURL: "http://localhost:4000", // バックエンドの URL
});

/**
 * タスク一覧を取得する
 */
export const fetchTasks = (): Promise<Task[]> =>
  API.get<Task[]>("/tasks").then((res) => res.data);

/**
 * タスクを新規作成する
 */
export const createTask = (data: Partial<Task>): Promise<Task> =>
  API.post<Task>("/tasks", data).then((res) => res.data);

/**
 * タスクを更新する
 */
export const updateTask = (
  id: string,
  data: Partial<Task>
): Promise<Task> => API.patch<Task>(`/tasks/${id}`, data).then((res) => res.data);

/**
 * タスクを削除する
 */
export const deleteTask = (id: string): Promise<void> =>
      API.delete(`/tasks/${id}`)
         .then(() => {
           // delete は何も返ってこないので、ここで void に変換
         });