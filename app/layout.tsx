import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './assets/styles/globals.css';


const inter = Inter({subsets: ["latin"], variable: "--font-inter"});

// ALTERAR NO APP_PROD
export const metadata: Metadata = {
  title: "Ecommerce App",
  description: "App base para ecommerce utilizando Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
