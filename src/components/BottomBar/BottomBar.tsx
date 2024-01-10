import { useNavigate } from "react-router-dom"
import {  PiSuitcaseDuotone } from "react-icons/pi";
import { IoPeopleOutline } from "react-icons/io5";
import { HiOutlineBuildingOffice } from "react-icons/hi2";

function BottomBar() {
    const navigate=useNavigate()
  return (
    <>
    <footer className="footer-bar bg-[#1f2028]  fixed bottom-0 w-full ">
        <nav>
          <ul className="flex  justify-center space-x-2 gap-2">
            <div
              onClick={() => navigate("/")}
              className="nav-item btn-joblist flex flex-col items-center gap-1 text-[20px] text-white font-medium	m-2"
            >
              <PiSuitcaseDuotone className="nav-items-logo "></PiSuitcaseDuotone>
              <div className="text-[10px]">Home</div>
            </div>
            <div
              onClick={() => navigate("/users")}
              className="nav-item btn-joblist flex flex-col items-center gap-1 text-white text-[20px] font-medium m-2 "
            >
              <IoPeopleOutline className="nav-items-logo"></IoPeopleOutline>
              <div className="text-[10px]">People</div>
            </div>
            <div
              onClick={() => navigate("/company")}
              className="nav-item btn-joblist flex flex-col items-center gap-1 text-white text-[20px] font-medium m-2"
            >
              <HiOutlineBuildingOffice className="nav-items-logo"></HiOutlineBuildingOffice>
              <div className="text-[10px]">Company</div>
            </div>
            
           
            
          </ul>
        </nav>
      </footer>
    </>
  )
}

export  {BottomBar}