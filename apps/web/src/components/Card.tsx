// apps/web/src/components/Card.tsx

import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({ children, style }) => (
  <div
    style={{
      background: "var(--card-bg)",
      boxShadow: "var(--card-shadow)",
      borderRadius: "var(--space-sm)",
      padding: "var(--space-md)",
      marginBottom: "var(--space-md)",
      ...style,
    }}
  >
    {children}
  </div>
);
