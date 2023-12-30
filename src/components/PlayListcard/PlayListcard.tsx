import placeholder from "../../assets/empty-playlist.png";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { MdDelete } from "react-icons/md";

function PlayListcard() {
  return (
    <>
      <div className="playlist-card cursor-pointer shadow-[2px_2px_2px_2px_rgb(0,0,0,20%)] flex flex-col  h-[12rem] w-[18rem]  rounded-[10px] overflow-hidden">
        <div className="img-overlay h-[85%] overflow-hidden flex ">
          <div className="img-container    flex justify-center  ">
            <img
              src={"https://i.ytimg.com/vi/OvoOnZkQCcw/hq720.jpg"}
              alt=""
              className=" w-full object-fill "
            />
          </div>
          <div className="absolute w-[4rem] h-[10.2rem]    bg-[rgba(0,0,0,0.8)]  flex flex-col justify-center items-center text-white">
            <MdOutlinePlaylistAdd className="text-[2rem] bg-transparent" />0
          </div>
        </div>
        <div className="playlist-detail flex justify-between items-center  text-white pt-1 ps-2 pe-2">
            <div className="playlist-number ms-2 font-semibold">1</div>
            <div className="playlist-dlt-icon me-2 border-white border-[1px] p-[1px] border-solid"><MdDelete/></div>
        </div>
      </div>
    </>
  );
}

export { PlayListcard };
