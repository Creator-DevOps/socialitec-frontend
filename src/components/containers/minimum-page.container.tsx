import classNames from "classnames";
import { FC, ReactNode } from "react";

type Props = {
  id?: string;
  children?: ReactNode;
  className?: string;
  bg_color?: boolean;
};

const MinimumPageContainer: FC<Props> = ({
  id,
  children,
  className,
  bg_color,
}) => {
  return (
    <div
      id={id}
      className={classNames({
        "w-full max-h-full h-full min-h-screen flex flex-col": true,
        [`${className}`]: true && className,
        white: bg_color == true,
        "bg-white": !bg_color,
      })}
    >
      <div className="h-full flex flex-col flex-1">{children}</div>
    </div>
  );
};

export default MinimumPageContainer;
