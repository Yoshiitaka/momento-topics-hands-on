import type { AppProps } from "next/app";
import { Session } from "next-auth";
import '../src/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps<{ session: Session }>): JSX.Element {

  return (
      <Component {...pageProps} />
  );
}

export default MyApp;