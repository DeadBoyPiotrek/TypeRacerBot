import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Sono } from '@next/font/google';

const sono = Sono();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={sono.className}>
      <Component {...pageProps} />
    </main>
  );
}
