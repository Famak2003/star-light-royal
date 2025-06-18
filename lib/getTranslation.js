import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nextConfig from '../../next-i18next.config';

export async function getTranslation(locale, namespaces = ['common']) {
  const props = await serverSideTranslations(locale, namespaces, i18nextConfig);
  return props._nextI18Next.initialI18nStore[locale];
}
