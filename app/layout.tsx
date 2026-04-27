import type {Metadata} from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
});

export const metadata: Metadata = {
  title: 'Chalé Gran Reserva - Check-in',
  description: 'Informações para hóspedes do Chalé Gran Reserva',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html suppressHydrationWarning lang="pt-BR" className={`${inter.variable} ${cormorant.variable}`}>
      <body suppressHydrationWarning className="bg-[#f5f5f0] text-[#1a1a1a] antialiased">
        {children}
      </body>
    </html>
  );
}
