import React, { ReactNode } from 'react';

type ContentAreaProps = {
  children?: ReactNode;
};

const ContentArea: React.FC<ContentAreaProps> = ({ children }) => {
  return <div className="flex-1">{children}</div>;
};

export default ContentArea;
