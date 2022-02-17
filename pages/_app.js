import { I18nProvider } from "@lingui/react";
import { i18n } from "@lingui/core";
import { Reset } from 'styled-reset'

import useLocale from "../core/hooks/useLocale";

export default function App({ Component, pageProps }) {
  useLocale();

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <I18nProvider i18n={i18n}>
      <Reset />
      {getLayout(<Component {...pageProps} />)}
    </I18nProvider>
  );
}
