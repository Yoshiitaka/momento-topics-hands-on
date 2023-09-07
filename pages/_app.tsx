import type { AppProps } from "next/app";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import '../src/styles/globals.css'

const App = ({ Component, pageProps }: AppProps<{ session: Session }>): JSX.Element => (
  <>
    <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
    </SessionProvider>
  </>
)

export default App