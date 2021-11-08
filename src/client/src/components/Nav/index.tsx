import React from 'react';
import './index.css';

interface NavProps {
  pageName: string,
  alpha: number,
  onNavClick: (clickedTab: string) => void,
}

export const Nav: React.FC<NavProps> = ({ pageName, alpha , onNavClick }) => {

  return (
    <div
      className='nav-outer-container'
      style={{
        backgroundColor: `rgb(255, 228, 196, ${alpha})`
      }}
      onClick={() => { onNavClick(pageName) }}
    >
      
    </div>
  )
}