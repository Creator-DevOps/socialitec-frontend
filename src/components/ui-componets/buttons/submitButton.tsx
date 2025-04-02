import classNames from "classnames";

interface Props {
  title: string;
  bg?: string;
  size?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const SubmitButton = (props: Props) => {
  const { title, bg = "bg-primary", size, onClick = undefined, disabled } = props;

  const button_type = typeof onClick === "undefined" ? "submit" : "button";

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <input
      type={button_type}
      value={title}
      disabled={disabled}
      className={classNames({
        'text-sm sm:text-base font-semibold text-white h-[40px] rounded-none cursor-pointer  drop-shadow-sm tracking-[0.05rem] hover:bg-secondary px-6': true,
        'disabled:opacity-60':true,
        [`${bg}`]: true,
        [`${size}`]: true,
      })}
      onClick={handleClick} 
    />
  );
};


export default SubmitButton;