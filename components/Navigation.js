import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { logOut } from "../utils/functions";

const Navigation = ({ isloggedIn }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    Aos.init({ duration: 2000 });
  });

  const handleDropDown = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="navigation">
      <div className="navigation__container">
        <i class="fa-regular fa-bars-staggered"></i>

        <div className="navigation__items">
          <div onClick={handleDropDown} className="navigation__list help">
            help <i className="fas fa-caret-down"></i>
          </div>
          <div className={isActive ? "help__box active" : "help__box"}>
            <div className="navigation__list">
              <a href="#" className="navigation__list--link">
                terms & conditions
              </a>
            </div>
            <div className="navigation__list">
              <a href="#" className="navigation__list--link">
                privacy policy
              </a>
            </div>
          </div>

          {isloggedIn ? (
            <>
              <div className="navigation__list">
                <a className="navigation__list--link reg">YOU ARE LOGGED IN</a>
              </div>

              <div onClick={logOut} className="navigation__list help">
                log out
              </div>
            </>
          ) : (
            <>
              <div className="navigation__list">
                <a href="/login" className="navigation__list--link">
                  login
                </a>
              </div>

              <div className="navigation__list">
                <a href="/register" className="navigation__list--link reg">
                  register
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
