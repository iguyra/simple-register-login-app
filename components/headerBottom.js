import Loader from "../components/Loader/Loader";
import { useContext, useEffect } from "react";

import Link from "next/link";
import { AppContext } from "../context/userContext";

const headerBottom = () => {
  const [user, setUser] = useContext(AppContext);
  const isloggedIn = user ? user.email : false;

  return (
    <div className="headerBottom">
      <Loader />
      <div className="">
        <div className="headerBottom__header">
          <div className="icon">
            <Loader />

            {/* <i className="fab fa-btc"></i> */}
            {/* <i class="fab-regular fa-solar-system"></i> */}
            <img class="fab fa-btc" src="/static/globe.png" alt="" />
          </div>
        </div>
        {/* <Canvas /> */}
        <div className="headerBottom__details ">
          Largest Byte <br />
          Running company
          <Loader />
        </div>
      </div>
      <div className="headerBottom__start">
        <div className="headerBottom__phrase">Start Byte Running today</div>
        <div className="headerBottom__action">
          <p>
            <a className="headerBottom__action--link" href="/register">
              {isloggedIn ? `welcome ${user.fullName}` : "start now"}
            </a>
          </p>
          <Loader />
        </div>
        {/* <Loader /> */}
      </div>
    </div>
  );
};

export default headerBottom;
