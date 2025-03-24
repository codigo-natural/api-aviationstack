'use client'

import { ThemeProvider } from "next-themes"

export function ThemeProviderWrapper({ children, ...props }) {
  return <ThemeProvider {...props}>{children}</ThemeProvider>
}