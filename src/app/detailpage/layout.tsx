import '../globals.css'

export const metadata = {
  title: 'Carbon Economy',
  description: 'Carbon Project Directory',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-surface-page font-sans">{children}</body>
    </html>
  )
}