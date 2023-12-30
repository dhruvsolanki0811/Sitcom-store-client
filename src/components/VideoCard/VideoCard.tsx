import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { FaRegClock } from "react-icons/fa";
import { MdOutlinePlaylistAdd } from "react-icons/md";

type typeProp='list'|'like'|'watchlater'|'history'|'playlist'
function VideoCard({type='list'}:{type?:typeProp}) {
  const [ShowMenu, setShowMenu] = useState(false);
  const toggleShow = () => {
    setShowMenu(!ShowMenu);
  };
  console.log(type)
  return (
    <>
      <div className="video-card flex flex-col  cursor-pointer min-w-[16.6rem] w-[16.8rem]  h-[14rem] gap-1 shadow-[2px_2px_2px_2px_rgb(0,0,0,20%)]">
        <div
          onClick={() => {}}
          className="vid-img-wrapper h-[70%]  rounded-[0.3rem] overflow-hidden"
        >
          <img
            src="https://i.ytimg.com/vi/E47mx4rsVCI/hq720.jpg"
            className="h-full w-full object-fill "
            alt=""
          />
        </div>
        <div className="vid-details-wrapper ps-1 pe-1    flex jusitfy-between items-center h-[25%] text-white font-bold text-xs">
          <div className="channels-photo overflow-hidden h-9  rounded-full w-[12%]">
            <img
              src="https://m.media-amazon.com/images/M/MV5BNDVkYjU0MzctMWRmZi00NTkxLTgwZWEtOWVhYjZlYjllYmU4XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg"
              alt=""
            />
          </div>

          <div className="tile-channel-wrapper flex flex-col ps-2 pe-2 w-[81%]">
            <div className="video-title text-ellipsis overflow-hidden whitespace-nowrap ">
              Monica and Chandler Almost Get Married
            </div>
            <div className="video-channel">Friends</div>
          </div>
         
          <div onClick={toggleShow} className="video-option flex items-center text-[1rem] h-full">
            <HiDotsVertical />
           
          </div>
          {ShowMenu && <>
            <div className="show-menu flex flex-col gap-1 absolute  mb-[15px] ms-[5rem] h-[4.5rem]  w-[10rem] rounded-[10px]">
            <div className="menu-items ps-3 pt-2 pb-2 flex gap-2 items-center rounded-[6px] border-white border-[1px] border-solid">
                <FaRegClock className="text-[1.2rem]"></FaRegClock>
                <div className="menu-text">Add to watch later</div>
            </div>
            <div className="menu-items ps-3 pt-2 pb-2 flex gap-2 items-center border-white rounded-[6px] border-[1px] border-solid">
                <MdOutlinePlaylistAdd className="text-[1.2rem]"></MdOutlinePlaylistAdd >

                <div className="menu-text text-xs">Add to Playlist</div>
            </div>
            </div>
          </>}  
        </div>
        
      </div>
    </>
  );
}

export { VideoCard };
