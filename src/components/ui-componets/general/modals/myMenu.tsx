import React, { useEffect, useRef, useState, ReactNode } from "react";

interface MyMenuProps {
  trigger: ReactNode;
  children: ReactNode;
}

const MyMenu: React.FC<MyMenuProps> = ({ trigger, children }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <div onClick={() => setOpen(!open)}>{trigger}</div>

      {open && (
        <div className="absolute right-full z-10 top-0 mt-2 w-30 bg-white border border-gray-200 rounded-md shadow-lg">
          {children}
        </div>
      )}
    </div>
  );
};

export default MyMenu;
