export default function RootLayout({ children }: { children?: any }) {
  return (
    <div className="relative w-full min-h-screen ">
      <div className="relative w-full top-0 left-0">{children}</div>
    </div>
  )
}
