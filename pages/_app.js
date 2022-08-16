import "bootstrap/dist/css/bootstrap.css";

function MyApp({ Component, pageProps }) {
  return (
    <div style={{ "font-size": "20px" }}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
