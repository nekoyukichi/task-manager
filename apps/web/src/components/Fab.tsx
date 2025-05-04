// apps/web/src/components/Fab.tsx

import React from "react";
import { Plus } from "lucide-react";

interface FabProps {
  onClick: () => void;
}

export const Fab: React.FC<FabProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    style={{
      position: "fixed",
      bottom: "var(--space-lg)",
      right: "var(--space-lg)",
      width: 56,
      height: 56,
      borderRadius: "50%",
      backgroundColor: "var(--primary-color)",
      color: "#fff",
      border: "none",
      boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      zIndex: 1000,
      transition: "background-color 0.2s",
    }}
    onMouseEnter={(e) =>
      (e.currentTarget.style.backgroundColor = "#5256e8")
    }
    onMouseLeave={(e) =>
      (e.currentTarget.style.backgroundColor = "var(--primary-color)")
    }
  >
    <Plus size={32} />
  </button>
);
