import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProviderWrapper } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'airport explorer',
  description: 'Encuentra aeropuertos y visualiza sus detalles',
}

export default function RootLayout({ children }) {
  return (
    <html lang='es' suppressHydrationWarning>
      <body
        className={`${inter.className} bg-white text-black dark:bg-[#0a1629] dark:text-white`}
      >
        <ThemeProviderWrapper
          attribute='class'
          defaultTheme='dark'
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProviderWrapper>
      </body>
    </html>
  )
}
