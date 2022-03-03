import { I18nProvider } from "@lingui/react";
import { i18n } from "@lingui/core";
import Head from "next/head";

import useLocale from "../core/hooks/useLocale";
import GlobalStyle from "utils/globalStyles";
import useSession from "@/hooks/useSession";

export default function App({ Component, pageProps }) {
  useLocale();
  const {user} = useSession(Component.Auth);

  const Layout = ({children}) => (Component.getLayout || ((page) => page))(<>{children}</>);

  return (
    <I18nProvider i18n={i18n}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Head>
      <GlobalStyle />
      <Layout>
        {!user && Component.Auth && (<h1>Waiting...</h1>)}
        {(!Component.Auth || user) && (<Component loggedInUser={user} {...pageProps} />)}
      </Layout>
    </I18nProvider>
  );
}
