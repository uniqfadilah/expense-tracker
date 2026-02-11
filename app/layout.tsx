import './globals.css'
import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import RootProviders from '@/components/providers/root-providers'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: 'Expense Tracker',
  description: 'An Expense Tracker Application.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: undefined,
      }}
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      afterSignOutUrl="/sign-in"
    >
      <html lang="en" suppressHydrationWarning>
        <head>
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </head>
        <body>
          <RootProviders>{children}</RootProviders>
          <Toaster richColors position="bottom-right" />
        </body>
      </html>
    </ClerkProvider>
  )
}
