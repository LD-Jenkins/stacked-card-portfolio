import React from "react";
import './index.css';

interface ContentProps {
  pageName: string,
  alpha: number,
}

export const Content: React.FC<ContentProps> = ({ pageName, alpha }) => {
  return (
    <div
      className={'content-outer-container'}
      id={`content-${pageName}`}
      style={{
        backgroundColor: `rgb(95, 158, 160, ${alpha})`
      }}
    >
      <div>
        {pageName}
      </div>
    </div>
  )
}