import React, { useEffect, useState } from "react";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
  Task,
} from "../services/api";

/**
 * TaskList コンポーネント
 * ・一覧取得
 * ・追加 / 完了切替 / 削除
 */
export const TaskList: React.FC = () => {
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
    setTasks(tasks.map(x => (x._id === t._id ? updated : x)));
  };

  // タスクを削除
  const handleDelete = async (id: string) => {
    await deleteTask(id);
    setTasks(tasks.filter(x => x._id !== id));
  };

  return (
    <div>
      <h1>Task Manager</h1>

      {/* 新規追加フォーム */}
      <div style={{ marginBottom: 16 }}>
        <input
          type="text"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          placeholder="新しいタスク名を入力"
        />
        <button onClick={handleAdd} style={{ marginLeft: 8 }}>
          追加
        </button>
      </div>

      {/* タスクリスト */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map(t => (
          <li
            key={t._id}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <input
              type="checkbox"
              checked={t.status === "done"}
              onChange={() => handleToggle(t)}
            />
            <span
              style={{
                marginLeft: 8,
                textDecoration:
                  t.status === "done" ? "line-through" : "none",
                flex: 1,
              }}
            >
              {t.title}
            </span>
            <button onClick={() => handleDelete(t._id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
