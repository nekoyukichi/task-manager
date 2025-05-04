// apps/web/src/components/TaskList.tsx
import React, { useEffect, useState } from "react";
import { fetchTasks, createTask, updateTask, deleteTask, Task } from "../services/api";
import { Card } from "./Card";
import { CheckCircle2, Circle, Trash2 } from "lucide-react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";

export const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    fetchTasks().then(setTasks);
  }, []);

  const handleAdd = async () => {
    if (!newTitle.trim()) return;
    const created = await createTask({ title: newTitle });
    setTasks([created, ...tasks]);
    setNewTitle("");
  };

  const handleToggle = async (t: Task) => {
    const updated = await updateTask(t._id, {
      status: t.status === "pending" ? "done" : "pending",
      completedAt: t.status === "pending" ? new Date().toISOString() : undefined,
    });
    setTasks(tasks.map(x => (x._id === t._id ? updated : x)));

    if (updated.status === "done") {
      // コンフェッティ発射
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.2 } });
    }
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    setTasks(tasks.filter(x => x._id !== id));
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <div style={{ marginBottom: "var(--space-md)" }}>
        <input
          type="text"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          placeholder="新しいタスク名を入力"
        />
        <button onClick={handleAdd} style={{ marginLeft: "var(--space-sm)" }}>
          <CheckCircle2 size={20} /> 追加
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        <AnimatePresence>
          {tasks.map(t => (
            <motion.li
              key={t._id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <Card
                className="task-card"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "var(--space-md)",
                  marginBottom: "var(--space-sm)",
                }}
              >
                <button
                  onClick={() => handleToggle(t)}
                  style={{ background: "none", border: "none", cursor: "pointer" }}
                >
                  {t.status === "done" ? (
                    <CheckCircle2 size={24} color="var(--primary-color)" />
                  ) : (
                    <Circle size={24} />
                  )}
                </button>
                <span
                  style={{
                    flex: 1,
                    marginLeft: "var(--space-sm)",
                    textDecoration: t.status === "done" ? "line-through" : "none",
                  }}
                >
                  {t.title}
                </span>
                <button
                  onClick={() => handleDelete(t._id)}
                  style={{ background: "none", border: "none", cursor: "pointer" }}
                >
                  <Trash2 size={20} />
                </button>
              </Card>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};
