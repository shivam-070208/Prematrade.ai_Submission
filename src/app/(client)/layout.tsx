import { Navbar } from '@/components';
import React from 'react'
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
    {children}
    </>
  )
}

