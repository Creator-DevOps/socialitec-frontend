import React, { useEffect } from 'react';
import xIconUrl from '@icons/XW.svg';
import errorIconUrl from '@icons/error.svg';
import warningIconUrl from '@icons/warning.svg';
import successIconUrl from '@icons/check_circle.svg';
import notificationIconUrl from '@icons/info.svg';

export const ToastErrorBGColor        = '#FF242B';
export const ToastWarningBGColor      = '#F97316';
export const ToastSuccessBGColor      = '#0E4AB4';
export const ToastNotificationBGColor = '#FFDD00';

export const ToastErrorIcon        = errorIconUrl;
export const ToastWarningIcon      = warningIconUrl;
export const ToastSuccessIcon      = successIconUrl;
export const ToastNotificationIcon = notificationIconUrl;

export type ToastObject = {
  id: number;
  title?: string;
  description?: string;
  icon: string;
  backgroundColor: string;
  fixed?: boolean;
  focused?: boolean;
};

type Props = {
  toastList: ToastObject[];
  position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  autoDelete?: boolean;
  autoDeleteTime?: number;
  marginTop?: number;
  removeToast: (id: number) => void;
};

const Toast: React.FC<Props> = ({
  toastList,
  position,
  autoDelete = false,
  autoDeleteTime = 3000,
  marginTop = 0,
  removeToast,
}) => {
  useEffect(() => {
    if (!autoDelete) return;
    const timer = setTimeout(() => {
      const first = toastList[0];
      if (first && !first.fixed && !first.focused) {
        removeToast(first.id);
      }
    }, autoDeleteTime);
    return () => clearTimeout(timer);
  }, [toastList, autoDelete, autoDeleteTime, removeToast]);

  return (
    <div
      className={`notification-container flex flex-col gap-2 pointer-events-none ${position}`}
      style={{ top: marginTop + 10 }}
    >
      {toastList.map((toast) => (
        <div
          key={toast.id}
          className="rounded-md flex items-center gap-3 py-2 px-3 shadow-md pointer-events-auto"
          style={{ backgroundColor: toast.backgroundColor }}
          onMouseEnter={() => (toast.focused = true)}
          onMouseLeave={() => (toast.focused = false)}
        >
          <img
            src={toast.icon}
            alt={toast.title ?? ''}
            className="notification-img text-white h-5 w-5"
          />
          <div className="flex flex-col items-start flex-1 text-white">
            {toast.title && (
              <p className="notification-title font-semibold select-none whitespace-nowrap">
                {toast.title}
              </p>
            )}
            {toast.description && (
              <p className="notification-message select-none">
                {toast.description}
              </p>
            )}
          </div>
          <button onClick={() => removeToast(toast.id)} className="p-1 hover:opacity-70">
            <img src={xIconUrl} alt="Cerrar" className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;