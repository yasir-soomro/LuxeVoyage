import type { Metadata } from 'next';
import '../index.css';

export const metadata: Metadata = {
  title: 'LuxeVoyage - Signature Experiences',
  description: 'Featured Tour Packages and Signature Experiences',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased text-white bg-black">
        {children}
      </body>
    </html>
  );
}
