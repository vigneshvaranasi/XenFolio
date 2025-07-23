import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Layout() {
  
  return (
    <div>
        <Navbar/>
        <div className="h-screen mt-5  w-11/12 md:w-8/12 mx-auto">
            <Outlet/>
        </div>
    </div>
  )
}

export default Layout

// bg-[#171e24]