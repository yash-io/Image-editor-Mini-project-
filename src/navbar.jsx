import React from 'react';

const Navbar = ({ isMenuOpen, toggleMenu, toggle_cmp , toggle_bg ,toggleHome,toggleMore}) => {


  const commonClasses = "xs:w-[25%] xxs:w-[50%] hover:text-white  hover:bg-red-800 transition duration-300 ease-in-out py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-center";

  return (
    <div className="bg-black  sticky top-0 rounded-md  w-full z-50 shadow-lg">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold text-white">IMAGE TOOL KIT</div>
        <button
          className="block sm:hidden bg-blue-600 text-white px-3 py-2 rounded-md transition duration-300 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={toggleMenu}
        >
          {!isMenuOpen && "Menu"}
      
          {
            isMenuOpen && 
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          }
        </button>
        <ul className="hidden sm:flex flex-row space-x-6 md:py-2 ">
          <li className={commonClasses} onClick={toggleHome} >pdf</li>
          <li className={commonClasses} onClick={toggle_cmp}>Img_Compress</li>
          <li className={commonClasses} onClick={toggle_bg}>BG-tool</li>
          <li className={commonClasses} onClick={toggleMore}>More-tools</li>
          
        </ul>
      </nav>
      
      {isMenuOpen && (
        <ul className="sm:hidden flex flex-col items-center bg-gray-800 text-white py-2 space-y-2 shadow-lg absolute top-full left-0 right-0 z-50">
          <li className={commonClasses} onClick={() => {toggleHome();toggleMenu()}} >pdf</li>
          <li className={commonClasses} onClick={() => {toggle_cmp();toggleMenu()}}>Img_Compressor</li>
          <li className={commonClasses} onClick={() => {toggle_bg();toggleMenu()}}>BG-tool</li>
          <li className={commonClasses} onClick={() => {toggleMore();toggleMenu()}}>More-tools</li>
          
        </ul>
      )}
    </div>
  );
};

export default Navbar;
