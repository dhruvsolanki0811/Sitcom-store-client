import { useLocation, useNavigate } from "react-router-dom"
import { AiOutlineHome } from "react-icons/ai";
import { FaRegCompass } from "react-icons/fa";
import { MdVideoLibrary } from "react-icons/md";

function BottomBar() {
    const navigate=useNavigate()
   const {pathname}= useLocation()
  return (
    <>
    <footer className="footer-bar bg-[#1f2028]  fixed bottom-0 w-full ">
        <nav>
          <ul className="flex  justify-center  gap-[3.3rem]">
            <div
              onClick={() => navigate("/")}
              className="nav-item btn-joblist cursor-pointer flex flex-col items-center gap-1 text-[20px] text-white font-medium	m-2"
            >
          <AiOutlineHome className="nav-items-logo" />

              <div className="text-[13px]">Home</div>
            </div>
            <div
              onClick={() => navigate("/explore")}
              className="nav-item btn-joblist cursor-pointer flex flex-col items-center gap-1 text-white text-[20px] font-medium m-2 "
            >
              <FaRegCompass className="nav-items-logo"></FaRegCompass>
              <div className="text-[13px]">Explore</div>
            </div>
            <div
              onClick={() => navigate("/library")}
              className="nav-item btn-joblist cursor-pointer flex flex-col items-center gap-1 text-white text-[20px] font-medium m-2"
            >
              <MdVideoLibrary className="nav-items-logo"></MdVideoLibrary>
              <div className="text-[13px]">Library</div>
            </div>
            
           
            
          </ul>
        </nav>
      </footer>
    </>
  )
}

export  {BottomBar}