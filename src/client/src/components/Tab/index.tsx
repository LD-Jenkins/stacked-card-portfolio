import React, { useState } from 'react';
import './index.css';
import { Nav } from '../Nav';
import { Content } from '../Content';

interface TabProps {
  pageName: string,
  height: number,
  width: number,
  alpha: number,
  onNavClick: (pageName: string) => void,
}

export const Tab: React.FC<TabProps> = ({ pageName, height, width, alpha, onNavClick }) => {

  return (
    <div
      className='tab-outer-container'
      id={pageName}
      style={{
        height: `${height}%`,
        width: `${width}%`,
      }}
    >
      <Nav
        pageName={pageName}
        onNavClick={onNavClick}
        alpha={alpha}
      />
      <Content
        pageName={pageName}
        alpha={alpha}
      />
    </div>
  )
}