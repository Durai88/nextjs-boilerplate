import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  reactStrictMode: true,
  turbopack: {},
};

export default withNextIntl(nextConfig);
