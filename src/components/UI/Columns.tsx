import React from "react";

interface ColumnsProps {
  children: React.ReactNode;
  multiline?: boolean;
  align?: "center" | "start" | "end";
  className?: string;
}

export function Columns({ children, multiline = false, align, className = "" }: ColumnsProps) {
  const flexWrap = multiline ? "flex-wrap" : "flex-nowrap";
  const alignItems = align ? `items-${align}` : "";
  return (
    <div className={`flex w-full ${flexWrap} ${alignItems} gap-4 ${className}`.trim()}>
      {children}
    </div>
  );
}

interface ColumnProps {
  children: React.ReactNode;
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  narrow?: boolean;
  className?: string;
}

export function Column({ children, size, narrow = false, className = "" }: ColumnProps) {
  const widthClass = size ? `w-${size}/12` : narrow ? "w-auto flex-none" : "flex-1";
  return (
    <div className={`${widthClass} ${className}`.trim()}>
      {children}
    </div>
  );
}
