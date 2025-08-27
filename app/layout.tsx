import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from 'next/script'; // Import the Script component
import Navbar from "./components/Navbar";
import LanguageProvider from "./components/LanguageProvider";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Scharling's Portfolio",
  description: "Jonas Jensen's Portfolio",
  icons: {
    icon: '/images/NewLogo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="da" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google Analytics Scripts */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-WNGCG8E8PE"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-WNGCG8E8PE');
            `,
          }}
        />
        {/* End Google Analytics Scripts */}

        <Navbar />
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
