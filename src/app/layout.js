import "./globals.css";

export const metadata = {
  title: "Manual de Identidade Visual - Pantanal Saúde",
  description: "Manual de Identidade Visual - Pantanal Saúde",
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
