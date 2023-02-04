import React, { useState } from "react";
import Navigation from "./Navigation";
import { useContext, useEffect } from "react";

import Link from "next/link";
import { AppContext } from "../context/userContext";
import { logOut } from "../utils/functions";

const HeaderDesktop = () => {
  const [user, setUser] = useContext(AppContext);

  const [isActive, setIsActive] = useState(false);
  const isloggedIn = user ? user.email : false;

  // console.log(isloggedIn);
  const [headerActive, setHeaderActive] = useState(false);
  const [menuActive, setMenuActive] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleBackground);
  }, []);
  const handleBackground = () => {
    if (window.scrollY > 96) {
      setHeaderActive(true);
    } else {
      setHeaderActive(false);
    }
  };

  const handleNav = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={headerActive ? "headerDesktop active" : "headerDesktop"}>
      <div className="headerDesktop__container">
        <div className="headerDesktop__name">
          <Link href="/">
            <img className="header__logo" src="/static/globe.png" alt="" />
          </Link>
        </div>

        <div className="headerDesktop__details">
          <ul className="headerDesktop__list">
            {isloggedIn && (
              <React.Fragment>
                <li className="headerDesktop__item">
                  <a className="headerDesktop__link headerDesktop__link--active loggedin">
                    YOU ARE LOGED IN
                  </a>
                </li>
                <li onClick={logOut} className="headerDesktop__item logout">
                  log out
                </li>
              </React.Fragment>
            )}
            {!isloggedIn && (
              <React.Fragment>
                <li className="headerDesktop__item">
                  <a href="/login" className="headerDesktop__link">
                    login
                  </a>
                </li>
                <li className="headerDesktop__item">
                  <a
                    href="/register"
                    className="headerDesktop__link headerDesktop__link--active"
                  >
                    start now
                  </a>
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HeaderDesktop;
