import "../styles/globals.css";
import Navbar from "../components/Navbar";

function MyApp({ Component, pageProps }) {
  return (
    // React Fragment
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
