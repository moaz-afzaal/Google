import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Google v2',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='dark'>
      <body className="dark:bg-[#262626] w-full min-h-screen">{children}</body>
    </html>
  )
}
