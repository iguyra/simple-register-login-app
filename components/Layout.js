import Header from "./Header";
import HeaderDesktop from "./HeaderDesktop";
import Footer from "./Footer";
import Media from "react-media";
import AppProvider from "../context/userContext";
import { useEffect, useState } from "react";

const Layout = ({ children }) => {
  return (
    <AppProvider>
      <Header />

      <HeaderDesktop />

      {children}
      <Footer />
    </AppProvider>
  );
};

// const Layout = ({ children }) => {
//   return (
//     <AppProvider>
//       <Media queries={{ small: { minWidth: 767 } }}>
//         {(matches) => (matches.small ? <HeaderDesktop /> : <Header />)}
//       </Media>
//       {children}
//       <Footer />
//     </AppProvider>
//   );
// };

export default Layout;
