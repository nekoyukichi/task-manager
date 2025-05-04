// apps/web/src/components/TaskList.tsx

import React, { useEffect, useState } from "react";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
  Task,
} from "../services/api";
import { Card } from "./Card";

interface TaskListProps {
  showForm: boolean;
}

/**
 * TaskList コンポーネント
 * ・showForm: true で追加フォームを表示
 * ・一覧取得
 * ・追加 / 完了切替 / 削除
 */
export const TaskList: React.FC<TaskListProps> = ({ showForm }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTitle, setNewTitle] = useState("");

  // 初回レンダーでタスク一覧を取得
  useEffect(() => {
    fetchTasks().then(setTasks);
  }, []);

  // タスクを追加
  const handleAdd = async () => {
    if (!newTitle.trim()) return;
    const created = await createTask({ title: newTitle });
    setTasks([created, ...tasks]);
    setNewTitle("");
  };

  // 完了↔未完了を切り替え
  const handleToggle = async (t: Task) => {
    const updated = await updateTask(t._id, {
      status: t.status === "pending" ? "done" : "pending",
      completedAt:
        t.status === "pending" ? new Date().toISOString() : undefined,
    });
    setTasks(tasks.map((x) => (x._id === t._id ? updated : x)));
  };

  // タスクを削除
  const handleDelete = async (id: string) => {
    await deleteTask(id);
    setTasks(tasks.filter((x) => x._id !== id));
  };

  return (
    <div>
      <h1>Task Manager</h1>

      {/* 新規追加フォーム（showForm が true のときだけ表示） */}
      {showForm && (
        <div style={{ marginBottom: "var(--space-md)" }}>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="新しいタスク名を入力"
            style={{ padding: "var(--space-sm)", width: "60%" }}
          />
          <button
            onClick={handleAdd}
            style={{
              marginLeft: "var(--space-sm)",
              padding: "var(--space-sm) var(--space-md)",
            }}
          >
            追加
          </button>
        </div>
      )}

      {/* タスクリスト */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((t) => (
          <Card
            key={t._id}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "var(--space-sm) var(--space-md)",
            }}
          >
            <input
              type="checkbox"
              checked={t.status === "done"}
              onChange={() => handleToggle(t)}
            />
            <span
              style={{
                marginLeft: "var(--space-sm)",
                textDecoration:
                  t.status === "done" ? "line-through" : "none",
                flex: 1,
              }}
            >
              {t.title}
            </span>
            <button onClick={() => handleDelete(t._id)}>🗑️</button>
          </Card>
        ))}
      </ul>
    </div>
  );
};
