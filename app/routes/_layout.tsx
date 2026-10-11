import { Outlet } from "@remix-run/react"
import Header from "../components/Header"

const _layout = () => {
  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="relative z-10 w-full pt-24">
        <Outlet />
      </main>
      {/* Background is handled by Scene in root.tsx */}
    </div>
  )
}

export default _layout