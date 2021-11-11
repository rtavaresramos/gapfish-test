import React from 'react';
import logo from '../../assets/img/logo.png';

import './styles.css'

const Navbar = () => {
  return <>
    <div className="nav__container">
      <div className="logo__container">
        <img src={logo} alt="Logo" />
      </div>
    </div>
  </>;
}

export default Navbar;