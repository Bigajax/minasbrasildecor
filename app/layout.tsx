import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import { site } from "@/data/site.config";
import "./globals.css";

/* A Bricolage faz o nome, a manchete e os títulos: larga, pesada, com
   o peso de letreiro de loja de móveis. A Instrument Sans faz o corpo,
   os campos e as medidas (algarismos tabulares). */
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--fonte-display",
  display: "swap",
});

const corpo = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--fonte-corpo",
  display: "swap",
});

const TITULO = "Minas Brasil Decor: sofás, mesas de madeira e camas em Contagem";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: TITULO,
    template: "%s · Minas Brasil Decor",
  },
  description: "Sofás retráteis, sofás de canto, poltronas, mesas de jantar em madeira maciça, painéis ripados, cômodas e camas box, com as medidas na etiqueta. Você escolhe no site e pede o orçamento pelo WhatsApp; a loja fica na Av. Fernão Dias, em Contagem, MG.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Minas Brasil Decor",
    url: site.url,
    title: TITULO,
    description: site.posicionamento,
    images: [{ url: "/og/site.jpg", width: 1200, height: 630, alt: "Minas Brasil Decor" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITULO,
    description: site.posicionamento,
    images: ["/og/site.jpg"],
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${display.variable} ${corpo.variable} antialiased`}>{children}</body>
    </html>
  );
}
