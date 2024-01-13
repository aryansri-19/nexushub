import type { Metadata } from 'next'
import './globals.css'
import AuthProvider from "@/providers/AuthProvider";
import { SessionProvider } from "next-auth/react";

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
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
