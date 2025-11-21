export default async function LocalePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const messages = (await import(`@/locales/${locale}.json`)).default;
  return (
    <div className="p-6">
      <h1>Locale: {locale}</h1>
      <p>This is the {locale} {messages.applyNow} page</p>
      <p>{messages.welcome}</p>
    </div>
  );
}