/* eslint-disable @next/next/next-script-for-ga */
import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => (
  <Html className={"h-full"}>
    <Head />
    <body className={" h-full"} suppressHydrationWarning={true}>
      <Main />
      <NextScript />
    </body>
  </Html>
)

export default Document
