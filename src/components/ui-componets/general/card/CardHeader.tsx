import React from "react";

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className = "" }) => {
  return (
    <div className="flex flex-col sm:flex-row md:gap-4 px-4 w-full justify-between items-center border-b-2 border-gray-200 ">
      {children}
    </div>
  );
};
