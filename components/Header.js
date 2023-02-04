import { useState } from "react";
import Navigation from "../components/Navigation";
import { useContext, useEffect } from "react";

import Link from "next/link";
import { AppContext } from "../context/userContext";

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const [user, setUser] = useContext(AppContext);
  // const [isloggedIn, setIsloggedIn] = useState(false);

  const isloggedIn = user ? user.email : false;

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
    <div className={headerActive ? "header active" : "header"}>
      <div className="header__container">
        <div className="header__name">
          {/* <p className="header__logo">cqb</p> */}

          <Link href="/">
            <img className="header__logo" src="/static/globe.png" alt="" />
          </Link>
        </div>

        <div className="header__details">
          <div onClick={handleNav} className="icon acive">
            <i className={isActive ? "fas fa-bars active" : "fas fa-bars"} />
          </div>
        </div>
      </div>

      {isActive ? <Navigation isloggedIn={isloggedIn} /> : ""}
    </div>
  );
};

export default Header;
