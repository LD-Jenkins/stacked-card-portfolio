import React, { useState, useEffect } from "react";
import './App.css';
import { Main } from './MainContainer';

const App: React.FC = (props) => {

  const [urlState, setUrlState] = useState(window.location.pathname);
  // console.log(window.location.pathname)

  useEffect(() => {
    updateURL();
  })
  
  const updateURL = () => {
    // const state = { page: 'about' }
    // const title = ''
    // const url = '/about'

    // history.pushState(state, title, url)
  }

  

  window.addEventListener('popstate', e => {
    setUrlState(e.state.path);
  })

  return (
    <Main
      urlPath={urlState}
    />
  );
};

export default App;