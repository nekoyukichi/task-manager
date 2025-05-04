// apps/web/src/components/Store.tsx

import React, { useEffect, useState } from "react";
import { fetchItems, purchaseItem, Item } from "../services/api";
import { Card } from "./Card";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, CheckCircle2 } from "lucide-react";

export const Store: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    fetchItems().then(setItems);
  }, []);

  const handleBuy = async (id: string) => {
    try {
      const { remaining } = await purchaseItem(id);
      alert(`購入成功！残りポイント: ${remaining} pt`);
    } catch (e: any) {
      alert(e.response?.data?.message || "購入に失敗しました");
    }
  };

  return (
    <div style={{ marginTop: "var(--space-lg)" }}>
      <h2>🎁 ストア</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <AnimatePresence>
          {items.map((i) => (
            <motion.li
              key={i._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                className="card"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "var(--space-md)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <ShoppingCart
                    size={24}
                    color="var(--primary-color)"
                    style={{ marginRight: "var(--space-sm)" }}
                  />
                  <div>
                    <strong>{i.name}</strong> — {i.price} pt
                    {i.description && (
                      <div style={{ fontSize: "var(--font-sm)", color: "#555" }}>
                        {i.description}
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleBuy(i._id)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "var(--space-sm)",
                  }}
                >
                  <CheckCircle2 size={28} color="var(--primary-color)" />
                </button>
              </Card>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};
