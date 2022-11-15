import '../styles/globals.css';

import { Lexend_Deca } from '@next/font/google';

const font = Lexend_Deca();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
