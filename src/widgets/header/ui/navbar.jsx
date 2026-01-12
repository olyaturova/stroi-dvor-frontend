import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TbShoppingBagHeart } from "react-icons/tb";
import { SideMenu } from "./side-menu";
import { TotalArticlesNavbar } from "@/features/cart-total-indicator";
import { Cart } from "@/widgets/cart";

import logo from "@/shared/assets/logo.png";
import "./navbar.css";

export const Navbar = ({ active, setActive }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = (e) => {
      e.stopPropagation();
      setIsMenuOpen(prevState => !prevState);
  };

  const toggleCart = () => {
        setActive(!active);
  };

  return (
      <>
          <header>
            <nav className="main-menu">
              <div className="navbar-logo">
                  <Link to="/" className="nav-link">
                      <img src={logo} alt="logo" className="company-logo" />
                  </Link>
              </div>
              <ul className="nav-list">
                <li className="nav-item">
                    <Link to="/stocks" className="nav-link">СТРОИТЕЛЬНЫЕ И ОТДЕЛОЧНЫЕ МАТЕРИАЛЫ</Link>
                </li>
                <li className="nav-item">
                    <Link to="/promos" className="nav-link">ПРОМОАКЦИИ</Link>
                </li>
                <li className="nav-item">
                    <Link to="/shop" className="nav-link">КАТАЛОГ СТРОЙМАТЕРИАЛОВ</Link>
                </li>
              </ul>
              <div className="cart-quantity">
                  <button onClick={toggleCart} className="cart-btn"> 
                  <TbShoppingBagHeart className="cart-icon" />
                  </button>
                  <TotalArticlesNavbar />
              </div>
              <div className={`menu-toggle ${isMenuOpen ? "open" : ''}`} onMouseDown={toggleMenu}>
                <div className="hamburger">
                  <span className="hamburger-top"></span>
                  <span className="hamburger-middle"></span>
                  <span className="hamburger-bottom"></span>
                </div>
              </div>
            </nav>
          </header>
             <div className={active ? "cart" : "cart openCart"}>
        <Cart active={active} setActive={setActive} />
      </div>
          <SideMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} toggleMenu={toggleMenu} />
      </>
  );
};