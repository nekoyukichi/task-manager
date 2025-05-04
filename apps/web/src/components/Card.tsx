// apps/web/src/components/Card.tsx
import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  style,
  ...rest
}) => {
  return (
    <div
      className={`card ${className}`}
      style={{
        backgroundColor: "var(--card-bg)",
        boxShadow: "var(--card-shadow)",
        borderRadius: "8px",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
};
