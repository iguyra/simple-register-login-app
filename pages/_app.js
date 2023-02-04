import "../sass/main.scss";
import AppProvider from "../context/userContext";

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <div className="MyApp">
        <Component {...pageProps} />
      </div>
    </AppProvider>
  );
}

export default MyApp;
