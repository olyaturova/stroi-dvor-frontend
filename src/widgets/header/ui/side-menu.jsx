import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { SocialLinks } from "./social-links";
import { HashLink } from 'react-router-hash-link';

export const SideMenu = ({isMenuOpen, setIsMenuOpen, toggleMenu}) => {
    const menuRef = useRef();
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setIsMenuOpen(false);
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [setIsMenuOpen]);

    return(
        <nav ref={menuRef} className={`menu column-start ${isMenuOpen ? "open" : ''}`}>
        <ul className="column-start">
          <li><Link to="/" onClick={toggleMenu} className='aside-link'>Главная страница</Link></li>
          <li><Link to="/stocks" onClick={toggleMenu} className='aside-link'>Наш ассортимент</Link></li>
          <li><Link to="/daily" onClick={toggleMenu} className='aside-link'>Режим работы</Link></li>
          <li><Link to="/promos" onClick={toggleMenu} className='aside-link'>Специальные предложения</Link></li>
          <li><Link to="/shop" onClick={toggleMenu} className='aside-link'>Каталог стройматериалов</Link></li>
        </ul>
        <SocialLinks />
        <button className="nav-btn">
        <HashLink smooth to="/#form" className="message-link text-light">Отправить нам сообщение</HashLink>
        </button>
      </nav>
    )
}