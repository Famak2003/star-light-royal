import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from 'next/headers';
import { dir } from 'i18next';
import "./globals.css";

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { StoreProvider } from "./StoreProvider";
config.autoAddCss = false

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Star Light Royal",
  description: "Best Education For Your Better Future",
};

const fallbackLocale = 'en'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const cookieStore = await cookies();
  const locale = cookieStore.get('lang')?.value || fallbackLocale;

  return (
    <html className=" scroll-smooth " lang={locale} dir={dir(locale)} >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}        
      >
        <StoreProvider>
            {children}
        </StoreProvider>
      </body>
    </html>
  );
}
