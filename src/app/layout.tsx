import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '~/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Next JS Crystallize App',
    description: 'Demo the Auth process using a Middleware',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    )
}
