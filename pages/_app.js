import "bootstrap/dist/css/bootstrap.css";

function MyApp({ Component, pageProps }) {
  return (
    <div style={{ fontSize: "20px" }}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
