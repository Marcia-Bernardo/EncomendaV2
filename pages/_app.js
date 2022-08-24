import "bootstrap/dist/css/bootstrap.css";
import { AppWrapper } from "../lib/AppWrapper";
import "../lib/style.css";
function MyApp({ Component, pageProps }) {
  return (
    <AppWrapper>
      <div style={{ fontSize: "20px" }}>
        <Component {...pageProps} />
      </div>
    </AppWrapper>
  );
}

export default MyApp;
