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
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { CheckCircle2, Circle, Trash2 } from "lucide-react";

interface TaskListProps {
  showForm: boolean;
}

/**
 * TaskList コンポーネント
 * ・showForm: true で追加フォームを表示
 * ・タスク完了時にアイコン＋コンフェッティ
 */
export const TaskList: React.FC<TaskListProps> = ({ showForm }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    fetchTasks().then(setTasks);
  }, []);

  // タスク追加
  const handleAdd = async () => {
    if (!newTitle.trim()) return;
    const created = await createTask({ title: newTitle });
    setTasks([created, ...tasks]);
    setNewTitle("");
  };

  // 完了↔未完了切替＋コンフェッティ
  const handleToggle = async (t: Task) => {
    const updated = await updateTask(t._id, {
      status: t.status === "pending" ? "done" : "pending",
      completedAt:
        t.status === "pending" ? new Date().toISOString() : undefined,
    });
    setTasks(tasks.map((x) => (x._id === t._id ? updated : x)));

    // 完了時だけ花火エフェクト
    if (updated.status === "done") {
      confetti({ particleCount: 50, spread: 60 });
    }
  };

  // タスク削除
  const handleDelete = async (id: string) => {
    await deleteTask(id);
    setTasks(tasks.filter((x) => x._id !== id));
  };

  return (
    <div>
      <h1>Task Manager</h1>

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

      <ul style={{ listStyle: "none", padding: 0 }}>
        <AnimatePresence>
          {tasks.map((t) => (
            <motion.li
              key={t._id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                className="card"
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "var(--space-sm) var(--space-md)",
                }}
              >
                {/* 完了アイコン */}
                <button
                  onClick={() => handleToggle(t)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {t.status === "done" ? (
                    <CheckCircle2 size={24} color="var(--primary-color)" />
                  ) : (
                    <Circle size={24} color="var(--text-color)" />
                  )}
                </button>

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

                {/* 削除アイコン */}
                <button
                  onClick={() => handleDelete(t._id)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <Trash2 size={20} color="var(--text-color)" />
                </button>
              </Card>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};

