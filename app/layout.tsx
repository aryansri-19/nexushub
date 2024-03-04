import type { Metadata } from 'next'
import './styles/globals.css'
import AuthProvider from "@/providers/AuthProvider";
import { NextProvider } from '@/providers/NextProvider';

export const metadata: Metadata = {
  title: 'Nexus Hub',
  description: 'A social network for events and gatherings.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <NextProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </NextProvider>
      </body>
    </html>
  )
}
