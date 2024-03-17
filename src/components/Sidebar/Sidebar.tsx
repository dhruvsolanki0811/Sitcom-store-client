import { AiOutlineHome } from "react-icons/ai";
import { FaRegCompass } from "react-icons/fa";
import { RiPlayList2Fill } from "react-icons/ri";
import { FaHistory } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { FaRegClock } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

function Sidebar() {
const navigate=useNavigate()
const {pathname} = useLocation();
console.log(pathname)
  return (
    <>
      <div className="sidebar-sec sticky z-10 top-[4.6rem] flex flex-col items-center  h-[88vh] gap-3 shadow-custom px-1">
        <div onClick={()=>navigate("/")} className={twMerge(pathname=='/'?"bg-[grey]":""," sidebar-items w-full py-1  my-1 cursor-pointer flex flex-col items-center justify-center gap-2 text-white ")}>
          <AiOutlineHome className="sidebar-items-icons   text-[1.6rem] " />
          <div className="sidebar-items-text text-[2.2vh] ">Home</div>
        </div>
        <div onClick={()=>navigate("/explore")} className={twMerge(pathname=='/explore'?"bg-[grey]":"","sidebar-items w-full py-1 my-1 cursor-pointer flex flex-col items-center justify-center gap-2 text-white ")}>
          <FaRegCompass className="sidebar-items-icons   text-[1.6rem]" />
          <div className="sidebar-items-text text-[2.2vh] ">Explore</div>
        </div>
        <div onClick={()=>navigate("/playlists")} className={twMerge(pathname=='/playlists'?"bg-[grey]":"","sidebar-items w-full py-1 my-1 cursor-pointer flex flex-col items-center justify-center gap-2 text-white ")}>
          <RiPlayList2Fill className="sidebar-items-icons  text-[1.6rem]" />
          <div className="sidebar-items-text cursor-pointer text-[2.2vh] ">Playlist</div>
        </div>
        <div onClick={()=>navigate("/history")} className={twMerge(pathname=='/history'?"bg-[grey]":"","sidebar-items w-full py-1 my-1 cursor-pointer flex flex-col items-center justify-center gap-2 text-white ")}>
          <FaHistory className="sidebar-items-icons     text-[1.6rem]" />
          <div className="sidebar-items-text text-[2.2vh] ">History</div>
        </div>
        <div onClick={()=>navigate("/likes")} className={twMerge(pathname=='/likes'?"bg-[grey]":"","sidebar-items w-full py-1 my-1 cursor-pointer flex flex-col items-center justify-center gap-2 text-white ")}>
          <BiLike className="sidebar-items-icons     text-[1.6rem]" />
          <div className="sidebar-items-text text-[2.2vh] ">Likes</div>
        </div>
        <div onClick={()=>navigate("/watchlater")} className={twMerge(pathname=='/watchlater'?"bg-[grey]":"","sidebar-items w-full py-1 my-1 cursor-pointer flex flex-col items-center justify-center gap-2 text-white ")}>
          <FaRegClock className="sidebar-items-icons     text-[1.6rem]" />
          <div className="sidebar-items-text text-[2.2vh] ">WatchLater</div>
        </div>
      </div>
    </>
  );
}

export { Sidebar };
