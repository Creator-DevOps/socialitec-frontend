import React from "react";

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const CardBody: React.FC<CardBodyProps> = ({ children, className = "" }) => {
  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 scrollable-container">
      {children}
    </div>
  );
};
