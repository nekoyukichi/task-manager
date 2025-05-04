import React from "react";
import { PointsDisplay } from "./components/PointsDisplay";
import { TaskList } from "./components/TaskList";

function App() {
  return (
    <div style={{ padding: 24 }}>
      {/* ここでポイント残高を表示 */}
      <PointsDisplay />

      {/* 既存のタスクリスト */}
      <TaskList />
    </div>
  );
}

export default App;
