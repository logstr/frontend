import { i18n } from '@lingui/core';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const useLocale = () => {
  const {locale, pathname, asPath, query, push} = useRouter();
  
  useEffect(() => {
    activate(locale);
  }, [locale]);

  async function activate(locale) {
    const { messages } = await import(`../../locales/${locale}/messages.js`);
    i18n.load(locale, messages);
    i18n.activate(locale);
  }

  return {
    setLocale(nextLocale) {
      push({ pathname, query }, asPath, { locale: nextLocale })
    },
    locale
  }
}

export default useLocale;
