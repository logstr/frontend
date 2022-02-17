import { i18n } from '@lingui/core';
import { useRouter } from 'next/router';

const useLocale = () => {
  const {locale} = useRouter();

  return {
    async activate(locale) {
      const { messages } = await import(`../../locales/${locale}/messages.js`);
      i18n.load(locale, messages);
      i18n.activate(locale);
    },
    locale
  }
}

export default useLocale;
