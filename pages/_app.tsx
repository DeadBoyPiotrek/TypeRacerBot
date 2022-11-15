import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Lexend_Deca } from '@next/font/google';

const font = Lexend_Deca();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={font.className}>
      <Component {...pageProps} />
    </main>
  );
}
