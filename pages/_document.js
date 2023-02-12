import Header from "@/components/head";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Header />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
