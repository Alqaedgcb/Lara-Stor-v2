
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/header';
import Footer from '@/components/footer';
import WhatsAppFab from '@/components/whatsapp-fab';
import { FirebaseClientProvider } from '@/firebase';

export const metadata: Metadata = {
  title: 'LARA - عالم الفخامة والأناقة',
  description: 'متجر LARA الإلكتروني هو وجهتك الأولى للمجوهرات الفاخرة والساعات النادرة والعطور الراقية. نقدم تشكيلات حصرية تجمع بين الأصالة والأناقة.',
  manifest: '/manifest.json',
  icons: {
    apple: "/icons/icon-192x192.png",
  }
};

export const viewport: Viewport = {
  themeColor: '#1A237E',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400;500;700;800&family=Source+Code+Pro:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body
        className={cn(
          "min-h-screen font-body antialiased",
        )}
      >
        <FirebaseClientProvider>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <WhatsAppFab />
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
