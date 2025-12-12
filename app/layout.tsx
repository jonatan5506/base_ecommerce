import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './assets/styles/globals.css';
import { APP_NAME, APP_DESCRIPTION, SERVER_URL } from "@/lib/constants";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";


const inter = Inter({subsets: ["latin"], variable: "--font-inter"});

//Opções de metadata para a aplicação (Parte superior do navegador)
export const metadata: Metadata = {
  title: {
    template: `%s | Título`,
    default: APP_NAME,
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(SERVER_URL),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable} suppressHydrationWarning>{/* supress evita problemas com css na transição */}
      <body className="antialiased">
        <ThemeProvider 
         attribute='class' 
         defaultTheme='light'
         enableSystem 
         disableTransitionOnChange>{/* evita problemas com css na transição */}
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
