import { I18nProvider } from "@lingui/react";
import { i18n } from "@lingui/core";

import { useEffect } from "react";
import useLocale from "../core/hooks/useLocale";

export default function App({ Component, pageProps }) {
  const locale = useLocale();

  useEffect(() => {
    locale.activate(locale.locale);
  }, []);

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <I18nProvider i18n={i18n}>
      {getLayout(<Component {...pageProps} />)}
    </I18nProvider>
  );
}
