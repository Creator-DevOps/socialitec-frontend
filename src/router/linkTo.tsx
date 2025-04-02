import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Tooltip } from "@mui/material";

interface CustomLinkProps {
  to: string;
  children: ReactNode;
  tooltip?: string;
  className?: string;
}

const CustomLink: React.FC<CustomLinkProps> = ({
  to,
  children,
  tooltip,
  className,
}) => {
  

  const linkContent = (
    <Link
      to={to}
      className={`hover:underline text-secondary text-sm md:text-sm ${className}`}
    >
      {children}
    </Link>
  );

  return tooltip ? (
    <Tooltip
      title={tooltip}
      arrow
      placement="right"
      slotProps={{
        tooltip: {
          className:
            "!bg-gray-100 !text-black px-4 py-2 rounded-lg shadow-md text-xs sm:text-sm",
        },
        arrow: {
          className: "!text-gray-100",
        },
      }}
    >
      <span>{linkContent}</span>
    </Tooltip>
  ) : (
    linkContent
  );
};

export default CustomLink;
