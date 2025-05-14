import { NavLink } from "react-router-dom";

interface SidebarButtonProps {
  to?: string;
  children: React.ReactNode;
  label: string;
  onClick?: () => void;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({ to, children, label, onClick }) => {

  if (to) {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          `sidebarbutton ${isActive ? 'border border-secondary font-semibold' : ''}`
        }
      >
        <span className="h-6 w-6 md:h-8 md:w-8">{children}</span>
        <span className="font-bold text-xs md:text-sm">{label}</span>
      </NavLink>
    );
  }
  return (
    <div
      onClick={onClick}
      className={`sidebarbutton cursor-pointer`}>
      <span className="h-6 w-6 md:h-8 md:w-8">{children}</span>
      <span className="font-bold text-xs md:text-sm">{label}</span>
    </div>
  );
};

export default SidebarButton;
