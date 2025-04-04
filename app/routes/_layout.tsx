import { Outlet } from "@remix-run/react"
import Header from "../components/Header"
import Profile from "../components/Profile"
import Foter from "~/components/Foter"

const _layout = () => {
  return (
    <div>
        <>
      {/* <ParticlesBackground/> */}
      <div className="lg:container bg-gray-950 mx-auto lg:pl-4   ">
        <Header />
        <div className="flex justify-between  min-h-screen w-full flex-col lg:flex-row">
          {/* Sidebar - Fixed on all screens */}
          {/* <div className="w-full lg:w-[200px] lg:h-screen  lg:left-0 lg:top-0  shadow-md flex items-center justify-center">
            <Sidebar />
          </div> */}

          {/* Profile - Fixed on all screens */}
          <div className="w-full lg:w-[350px] lg:h-[90vh] mt-16 lg:left-[150px] lg:top-0  shadow-md flex items-center justify-center  lg:pt-1">
            <Profile />
          </div>

          {/* Main Content - Scrollable */}
          <div className="w-full  p-4 lg:top-0 mt-0   flex flex-col items-center justify-center ">
            <div className="max-h-[vh] w-full rounded-3xl overflow-x-auto [&::-webkit-scrollbar]:hidden">
              <Outlet/>
            </div>
          {/* <Foter/> */}
          </div>
        </div>
      </div>
    </>
    </div>
  )
}

export default _layout