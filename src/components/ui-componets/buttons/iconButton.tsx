import React, { FC, ReactNode, MouseEvent } from "react";
import { Tooltip } from "@mui/material";

type IconButtonProps = {
  children: ReactNode;
  tooltip?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

export const IconButton: FC<IconButtonProps> = ({
  children,
  tooltip,
  onClick,
  disabled,
  className,
  onMouseEnter,
  onMouseLeave,
}) => {
  const enhancedChildren = React.Children.map(children, (child) => {
    if (
      React.isValidElement(child) &&
      typeof child.type === "string" &&
      child.type === "img"
    ) {
      return React.cloneElement(
        child as React.ReactElement<{ className?: string }>,
        {
          className: `icon-size ${child.props.className || ""}`,
        }
      );
    }
    return child;
  });

  const button = (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`p-2 hover:bg-gray-50 rounded-3xl cursor-pointer ${
        className || ""
      }`}
    >
      {enhancedChildren}
    </button>
  );

  if (!tooltip) return button;

  return (
    <Tooltip
      title={tooltip}
      arrow
      placement="right"
      slotProps={{
        tooltip: {
          className: `!bg-gray-100 !text-gray-700 px-4 py-2 rounded-lg shadow-md text-xs sm:text-sm`,
        },
        arrow: {
          className: "!text-gray-100",
        },
      }}
    >
      <span> {button}</span>
     
    </Tooltip>
  );
};
