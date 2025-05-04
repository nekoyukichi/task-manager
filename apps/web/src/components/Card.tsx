// apps/web/src/components/Card.tsx

import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  // もし他に props があればここに追加
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  style,
  ...rest
}) => {
  // className をマージして div に渡します
  const cls = ["card", className].filter(Boolean).join(" ");
  return (
    <div className={cls} style={style} {...rest}>
      {children}
    </div>
  );
};
