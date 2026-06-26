import React from "react";

interface BoxProps {
  children: React.ReactNode;
  flat?: boolean;
  className?: string;
}

export function Box({ children, flat = false, className = "" }: BoxProps) {
  // Trilogy rules: "La couleur de la bordure en flat ne peut pas être changée."
  // And it must provide structural layout.
  const flatClass = flat ? "border border-gray-200 bg-white" : "shadow-md bg-white rounded-lg";
  
  return (
    <div className={`p-6 ${flatClass} ${className}`.trim()}>
      {children}
    </div>
  );
}
