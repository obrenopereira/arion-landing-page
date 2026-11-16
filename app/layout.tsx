import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = { title: 'Arion — Transporte Executivo', description: 'Mobilidade executiva para quem valoriza o próprio tempo. Transporte corporativo, transfer aeroporto, eventos e viagens com a Arion.', icons: { icon: '/images/Logo-1.webp' } };

const googleTagManagerScript = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-P9BG477X');`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        <script id="google-tag-manager" dangerouslySetInnerHTML={{ __html: googleTagManagerScript }} />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P9BG477X"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
            title="Google Tag Manager"
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
