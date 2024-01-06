import { AiOutlineHome } from "react-icons/ai";
import { FaRegCompass } from "react-icons/fa";
import { RiPlayList2Fill } from "react-icons/ri";
import { FaHistory } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { FaRegClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Sidebar() {
const navigate=useNavigate()
  return (
    <>
      <div className="sidebar-sec sticky z-10 top-[4.4rem] flex flex-col items-center pt-2 h-full gap-4">
        <div onClick={()=>navigate("/")} className="sidebar-items flex flex-col items-center justify-center gap-2 text-white ">
          <AiOutlineHome className="sidebar-items-icons   text-[4vh]" />
          <div className="sidebar-items-text text-[2.2vh] ">Home</div>
        </div>
        <div onClick={()=>navigate("/explore")} className="sidebar-items flex flex-col items-center justify-center gap-2 text-white ">
          <FaRegCompass className="sidebar-items-icons   text-[4vh]" />
          <div className="sidebar-items-text text-[2.2vh] ">Explore</div>
        </div>
        <div onClick={()=>navigate("/playlists")} className="sidebar-items flex flex-col items-center justify-center gap-2 text-white ">
          <RiPlayList2Fill className="sidebar-items-icons  text-[4vh]" />
          <div className="sidebar-items-text text-[2.2vh] ">Playlist</div>
        </div>
        <div onClick={()=>navigate("/history")} className="sidebar-items flex flex-col items-center justify-center gap-2 text-white ">
          <FaHistory className="sidebar-items-icons     text-[4vh]" />
          <div className="sidebar-items-text text-[2.2vh] ">History</div>
        </div>
        <div onClick={()=>navigate("/likes")} className="sidebar-items flex flex-col items-center justify-center gap-2 text-white ">
          <BiLike className="sidebar-items-icons     text-[4vh]" />
          <div className="sidebar-items-text text-[2.2vh] ">Likes</div>
        </div>
        <div onClick={()=>navigate("/watchlater")} className="sidebar-items flex flex-col items-center justify-center gap-2 text-white ">
          <FaRegClock className="sidebar-items-icons     text-[4vh]" />
          <div className="sidebar-items-text text-[2.2vh] ">WatchLater</div>
        </div>
      </div>
    </>
  );
}

export { Sidebar };
