import { useState, useEffect } from 'react'
import { Link, Route, Routes } from "react-router-dom";
import logo from "../images/logo.svg";
import NavBar from "./NavBar";

function Header({ loggedIn, email, onLogout }) {
  const [windowDimension, setWindowDimension] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  })
  const [mobileMenuIsVisible, setMobileMenuIsVisible] = useState(false);
  const mobileMenuClassName = `header__mobile-menu ${ 
    mobileMenuIsVisible 
      ? "header__mobile-menu_close" 
      : "header__mobile-menu_open" }`;

  function detectSize() {
    setWindowDimension({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    })
  }

  function handleMobileMenu() {
    setMobileMenuIsVisible(!mobileMenuIsVisible);
  }

  useEffect(() => {
    window.addEventListener('resize', detectSize)

    return () => {
      window.removeEventListener('resize', detectSize)
    }
  }, [windowDimension])

  useEffect( () => {
    if (!loggedIn) {
      setMobileMenuIsVisible(false);
    }
  }, [loggedIn]);

  return (
    <>
      {
        loggedIn && mobileMenuIsVisible && windowDimension.winWidth < 500 &&
        <NavBar
          loggedIn={loggedIn}
          email={email}
          onLogout={onLogout} />
      }
      <header className="header">
        <img className="header__logo" src={logo} alt="Логотип Mesto"/>
        <div className="header__login">
          <Routes>
            <Route path="/" element={
              <>
                { windowDimension.winWidth > 500 &&
                  <NavBar
                    loggedIn={loggedIn}
                    email={email}
                    onLogout={onLogout} /> }
                { windowDimension.winWidth < 500 &&
                  <button
                    className={mobileMenuClassName}
                    onClick={handleMobileMenu} /> }
              </>
            }/>
            <Route path="/signin" element={
              <Link to="/signup" className="header__link">Зарегистрироваться</Link>
            }/>
            <Route path="/signup" element={
              <Link to="/signin" className="header__link">Войти</Link>
            }/>
          </Routes>
        </div>
      </header>
    </>
  );
}

export default Header;

