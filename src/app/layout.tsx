import './globals.css';
import Footer from '@/components/layouts/Footer';
import Header from '@/components/layouts/Header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body>
         <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
