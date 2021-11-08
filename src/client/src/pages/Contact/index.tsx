import React, { useState } from 'react';
import './index.css';
import { Nav } from '../../components/Nav';
import { Content } from '../../components/Content';

interface UrlProps {
  urlPath: string,
}

export const Main: React.FC<UrlProps> = ({ urlPath }) => {

  const updateURL = () => {
    const state = { page: 'about' }
    const title = ''
    const url = '/about'

    history.pushState(state, title, url)
  }

  return (
    <div
      className='main-outer-container'
    >
      
    </div>
  )
}