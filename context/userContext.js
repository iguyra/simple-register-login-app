import React, { useState, useEffect } from "react";

import { getUser } from "../utils/functions";

export const AppContext = React.createContext([{}, () => {}]);

const AppProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let isg, isGuest;

    // IS GUEST
    try {
      // const data = await getUser();
      let user = localStorage.getItem("user");

      user = user ? JSON.parse(user) : "";

      setUser(user);
    } catch (err) {}
  }, []);

  return (
    <AppContext.Provider value={[user, setUser]}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
