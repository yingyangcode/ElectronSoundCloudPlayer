import React from 'react';
//import logo from './public/js/logo.png';
//import soundcloudImage from './public/js/soundcloud.png';
//let logo = require('../public/js/logo.png');
//let soundcloudImage = require('../public/js/soundcloud.png');

//require('/app/public/img/logo.png'); 
//let soundcloudImage = require('/app/public/img/soundcloud.png'); 
const Footer =()=>{

    return(
      <div className="footer">
        <p>Love from 
        <img src={`${logo}`} className="logo" />
        &
        <img src={`${soundcloudImage}`} className="soundcloud"/>
        </p>
      </div>
    );
  
}

export default Footer;