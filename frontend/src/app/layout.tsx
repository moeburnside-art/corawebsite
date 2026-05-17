// Root layout — requis par Next.js App Router
// La vraie mise en page est dans src/app/[locale]/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
