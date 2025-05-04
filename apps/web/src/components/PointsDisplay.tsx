import React, { useEffect, useState } from "react";
import { fetchPoints } from "../services/api";

export const PointsDisplay: React.FC = () => {
  const [total, setTotal] = useState<number | null>(null);

  // 初回ロードでポイント取得
  useEffect(() => {
    fetchPoints().then((data) => {
      setTotal(data.total);
    });
  }, []);

  if (total === null) {
    return <div>ロード中…</div>;
  }

  return (
    <div style={{ marginBottom: 16, fontWeight: "bold" }}>
      あなたのポイント: {total} pt
    </div>
  );
};
