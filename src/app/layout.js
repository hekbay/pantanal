import "./globals.css";

export const metadata = {
  title: "Manual de Identidade Visual - Pantanal Saúde",
  description: "Guia completo de uso da marca, paleta de cores, tipografia e diretrizes de aplicação da Pantanal Saúde.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🦜</text></svg>",
  },
  openGraph: {
    title: "Identidade Visual - Pantanal Saúde",
    description: "Manual de Identidade Visual Oficial da Pantanal Saúde.",
    url: "https://pantanal-saude.vercel.app",
    siteName: "Pantanal Saúde",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Capa do Manual de Identidade Visual - Pantanal Saúde",
      }
    ],
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=Inter:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500;600&family=UnifrakturMaguntia&display=swap" rel="stylesheet" />
        <link href="https://fonts.cdnfonts.com/css/nohemi" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Cormorant+SC:wght@500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
