// apps/web/src/App.tsx

import React, { useState } from "react";
import { PointsDisplay } from "./components/PointsDisplay";
import { TaskList } from "./components/TaskList";
import { Store } from "./components/Store";
import { Fab } from "./components/Fab";

function App() {
  // フォーム表示のオン／オフを管理
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="app-container">
      {/* ポイント残高 */}
      <PointsDisplay />

      {/* タスクリスト + 追加フォーム */}
      <TaskList showForm={showForm} />

      {/* ストア画面 */}
      <Store />

      {/* フローティングボタンでフォームの表示/非表示 */}
      <Fab onClick={() => setShowForm((prev) => !prev)} />
    </div>
  );
}

export default App;
