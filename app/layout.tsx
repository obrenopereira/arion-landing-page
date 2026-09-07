import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Arion — Transporte Executivo', description: 'Mobilidade executiva para quem valoriza o próprio tempo. Transporte corporativo, transfer aeroporto, eventos e viagens com a Arion.', icons: { icon: '/images/Logo-1.webp' } };
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="pt-BR"><body>{children}</body></html>}
