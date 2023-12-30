import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Navbar, VideoCard } from "../../components/components";
import ReactPlayer from "react-player/youtube";
import { FaPlay } from "react-icons/fa6";
import { BiSolidLike } from "react-icons/bi";
import { FaRegClock } from "react-icons/fa";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import "./SingleVideoPage.css"

function SingleVideoPage() {
  return (
    <>
      <Navbar></Navbar>
      <div className="main-content flex w-full max-w-[100vw] mt-1">
        <Sidebar></Sidebar>
        <div className="content-wrapper flex  ps-1 w-full m-w-full h-full">
          <div className="video-container flex  basis-[70%] grow-[10] flex-col">
            <div className="player-wrapper">
              <ReactPlayer
                className="react-player"
                width="100%"
                height="100%"
                playing={true}
                light={"https://i.ytimg.com/vi/4BUgLMldFQY/hq720.jpg"}
                onStart={() => {}}
                url={`https://www.youtube.com/embed/pS8vN5pdBL4?si=XK84DdP4eSwR-_05`}
                controls={true}
                playIcon={
                  <>
                    <FaPlay className="text-white bg-transparent text-5xl" />
                  </>
                }
              ></ReactPlayer>
            </div>
            <div className="video-details-title text-white mt-2">
              The Office - Signs of a Declining Sitcom
            </div>
            <div className="video-details-channel text-white mt-2 text-sm ">
              <span className="border-b-2 pb-1">The Office-us </span>
            </div>
            <div className="like-section flex justify-end gap-6 mt-3    ">
              <div className="like-sec-items flex gap-1 items-center cursor-pointer">
                <BiSolidLike className="text-white text-xl" />
                <span className="text-white text-sm">Like</span>
              </div>
              <div className="like-sec-items flex gap-1 items-center cursor-pointer">
                <FaRegClock className="text-white text-xl" />
                <span className="text-white text-sm">Watch Later</span>
              </div>
              <div className="like-sec-items flex gap-1 items-center cursor-pointer">
                <MdOutlinePlaylistAdd className="text-white text-xl" />
                <span className="text-white text-sm">Add to Playlist</span>
              </div>
            </div>
          </div>
          <div className="vertical-video-grid flex flex-col justify-center items-center gap-2 ps-5  basis-[30%]">
                    {[1,2,3].map(()=>(
                        <VideoCard></VideoCard>
                    ))}
          </div>
        </div>
      </div>
    </>
  );
}

export { SingleVideoPage };
