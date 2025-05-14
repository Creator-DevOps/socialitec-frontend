
import React from "react";
import { CardHeader } from "./CardHeader";
import { CardBody } from "./CardBody";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div className={`flex flex-col flex-1 px-4 md:px-8 gap-4 ${className}`}>
      {children}
    </div>
  );
};

export { Card, CardHeader, CardBody };
