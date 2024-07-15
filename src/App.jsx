import React, { useState } from 'react';
import Navbar from './navbar.jsx';
import Home from './home.jsx';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [iscmp_Open, setIscmp_Open] = useState(false);
  const [isbg_Open, setIsbg_Open] = useState(false);
  const [ispdf_Open,setispdf_Open] = useState(true);

  const toggleHome = () =>{
    setIsbg_Open(false);
      setIscmp_Open(false);
      setispdf_Open(true);
  }
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleMore = () => {
      setIsbg_Open(false);
      setIscmp_Open(false);
      setispdf_Open(false);
  };

  const toggle_bg = () => {
    
      setIsbg_Open(true);
      setIscmp_Open(false);
      setispdf_Open(false);
    
  };
  const toggle_cmp= () =>{
   
      setIscmp_Open(true);
      setIsbg_Open(false);
      setispdf_Open(false);
      
    
  };

  return (
    <div className='bg-black min-h-screen'>
      <Navbar 
        isMenuOpen={isMenuOpen} 
        toggleMenu={toggleMenu} 
        toggleHome={toggleHome}
        toggle_bg={toggle_bg}
        toggle_cmp={toggle_cmp}
        toggleMore={toggleMore} 
      />
      <Home isbg_Open={isbg_Open} 
      iscmp_Open={iscmp_Open}
      ispdf_Open={ispdf_Open}

      />
    </div>
  );
};

export default App;

