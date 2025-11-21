import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export default getRequestConfig(async ({ locale }) => {
  const supportedLocales = ["en", "ta"];
  if (!supportedLocales.includes(locale)) notFound();

  return {
    locale,
    messages: (await import(`../locales/${locale}.json`)).default
  };
});