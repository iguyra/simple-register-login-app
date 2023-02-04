import Document, {
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";
// } from "./node_modules/next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="description" content="demo app for UNi Ghana" />
          <meta charSet="UTF-8" />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

          {/* <link rel="stylesheet" href="css/style.css" /> */}

          <link
            href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
            rel="stylesheet"
          ></link>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css"
            integrity="sha256-+N4/V/SbAFiW1MPBCXnfnP9QSN3+Keu+NlB+0ev/YKQ="
            crossOrigin="anonymous"
          />

          <script>
            /*to prevent Firefox FOUC, this must be here*/ let FF_FOUC_FIX;
          </script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
