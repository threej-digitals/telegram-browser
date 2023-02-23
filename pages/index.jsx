import Head from "next/head";
import Meta from "@/components/meta";
import Layout from "@/components/layout";
import HomeFeed from "@/components/homefeed";
import Script from "next/script";
import GlobalContextProvider from "@/context/GlobalContext";

export default function Home({ cookies }) {
  return (
    <>
      <Head>
        <title>Telegram browser</title>
        <link rel="icon" href="favicon.png" />
        <Meta
          title="Telegram browser"
          description="Browse public telegram channels according to their category and language"
          url="https://threej.in/telegram-browser"
          img="favicon.png"
          keywords="telegram chat, telegram channel, telegram browser, telegram news channels list, telegram relationship channels list, telegram political channels list, telegram dating channel list, telegram gaming channel list"
          index={true}
        />
        {/* matomo analytics */}
      </Head>
      <Script src="/telegram-browser/script/matomoTracker.js" />

      <GlobalContextProvider cookies={cookies}>
        <Layout>
          <HomeFeed />
        </Layout>
      </GlobalContextProvider>
    </>
  );
}

export const getServerSideProps = (ctx) => {
  return {
    props: {
      cookies: ctx.req.cookies,
    },
  };
};
