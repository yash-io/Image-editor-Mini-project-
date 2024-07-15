import React from 'react';
import Img_compress from './imgcompress';
import RemoveBackground from './backgroundtool.jsx';
import Component_pdf from './component_page.jsx';
import More_tools from './more-tools.jsx';
const Home = ({ iscmp_Open,isbg_Open,ispdf_Open}) => {

  if (isbg_Open) {
    return <RemoveBackground />;
  } else if (iscmp_Open) {
    return <Img_compress />;
  } else if(ispdf_Open){
    return <Component_pdf />;
  }
  else {
    return <More_tools />;
  }
};

export default Home;

