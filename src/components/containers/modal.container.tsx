import classNames from 'classnames';
import { ReactNode } from 'react';

interface ModalContainerProps {
  visible?: boolean;
  auto_width?: boolean;
  children?: ReactNode;
  onClose?: () => void;
  dismissible?: boolean;
}

const modalContainer = ({
  visible = false,
  children,
  auto_width = true,
  onClose,
  dismissible = true,
}: ModalContainerProps) => {

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (dismissible && event.target === event.currentTarget && onClose) {
      onClose();
    }
  };

  const handleModalClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
  };

  if (!visible) return null;

  return (
    <div
      className={classNames(
        "fixed inset-0 z-10 flex items-center justify-center overflow-auto scrollable-container",
        "bg-transparente" 
      )}
      onClick={handleBackdropClick}
    >
      <div
        className={classNames(
        
          "relative bg-white shadow-xl flex flex-col m-auto max-h-[80%] overflow-hidden border border-gray-300 rounded-md",
          { "w-80 md:w-3/5 lg:w-2/5 min-h-[120px]": auto_width }
        )}
        onClick={handleModalClick}
      >
        <div className="overflow-y-auto flex-grow p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default modalContainer;
