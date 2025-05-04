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
    <div style={{ padding: "var(--space-lg)" }}>
      <PointsDisplay />

      <TaskList showForm={showForm} />

      <Store />

      {/* フォローティングボタンでフォームの表示/非表示 */}
      <Fab onClick={() => setShowForm((prev) => !prev)} />
    </div>
  );
}

export default App;
