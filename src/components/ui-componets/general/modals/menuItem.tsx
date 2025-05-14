import React, { ReactNode } from "react";

interface MyMenuItemProps {
  icon: ReactNode;
  text: string;
  onClick: () => void;
  className?: string;
}

const MyMenuItem: React.FC<MyMenuItemProps> = ({
  icon,
  text,
  onClick,
  className,
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2 justify-between  cursor-pointer hover:bg-gray-100 text-xs md:text-sm ${
        className || ""
      }`}
    >
      <div className="flex flex-row">
        <span className="w-6 h-6">{icon}</span>
        <span>{text}</span>
      </div>
    </div>
  );
};

export default MyMenuItem;
