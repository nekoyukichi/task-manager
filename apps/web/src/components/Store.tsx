// apps/web/src/components/Store.tsx

import React, { useEffect, useState } from "react";
import { fetchItems, purchaseItem, Item } from "../services/api";
import { useTheme } from "../context/ThemeContext";

export const Store: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const { setTheme } = useTheme();

  useEffect(() => {
    fetchItems().then(setItems);
  }, []);

  const handleBuy = async (id: string) => {
    try {
      const { remaining } = await purchaseItem(id);
      alert(`購入成功！残りポイント: ${remaining} pt`);
      const bought = items.find((i) => i._id === id);
      if (bought?.name.includes("ネオン")) {
        setTheme("neon");
      }
    } catch (e: any) {
      alert(e.response?.data?.message || "購入に失敗しました");
    }
  };

  return (
    <div style={{ marginTop: 32 }}>
      <h2>🎁 ストア</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {items.map((i) => (
          <li
            key={i._id}
            style={{
              borderBottom: "1px solid #ddd",
              padding: "8px 0",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ flex: 1 }}>
              <strong>{i.name}</strong> — {i.price} pt
              {i.description && (
                <div style={{ fontSize: 12, color: "#555" }}>
                  {i.description}
                </div>
              )}
            </div>
            <button onClick={() => handleBuy(i._id)}>購入</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
