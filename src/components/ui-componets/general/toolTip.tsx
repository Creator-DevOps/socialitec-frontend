import React, { ReactElement, ReactNode } from "react";
import { Tooltip } from "@mui/material";

type ToolTipWrapperProps = {
  title: string;
  children: ReactNode;
};

const ToolTipWrapper: React.FC<ToolTipWrapperProps> = ({ title, children }) => {
  if (!React.isValidElement(children)) {
    return null;
  }

  return (
    <Tooltip
      title={title}
      arrow
      placement="right"
      slotProps={{
        tooltip: {
          className: `!bg-gray-100 !text-black px-4 py-2 rounded-lg shadow-md text-xs sm:text-sm`,
        },
        arrow: {
          className: "!text-gray-100",
        },
      }}
    >
      {children}
    </Tooltip>
  );
};

export default ToolTipWrapper;
