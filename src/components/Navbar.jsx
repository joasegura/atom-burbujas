import React from 'react';

const Navbar = () => {
  return (
    <header className="navbar" role="banner">
      <div className="nav-wrap">
        <div className="nav-left">
          <img src="/atom-react/public/logo-atom.png" alt="ATOM logo" className="nav-logo" />
        </div>
        <nav className="nav-center" aria-label="Principal">
          <a href="#que-hacemos" className="nav-link">Que hacemos?!</a>
          <a href="#quienes-somos" className="nav-link">Quienes somos?</a>
        </nav>
        <div className="nav-right">
          <a href="#nexus" className="nav-btn">Nexus</a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
