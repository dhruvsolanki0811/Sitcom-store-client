import placeholder from "../../assets/empty-playlist.png";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useVideoStore } from "../../store/Videostore";

function PlayListcard({id,title,firstvideo,videoCount}:{
  id:number|null,
  title:string,
  firstvideo?:string,
  videoCount:number
}) 
{
const {getPlaylists,deletePlaylist}=useVideoStore()
const handlePlaylistDelete=()=>{
 if(id){ deletePlaylist(id).then(()=>{
    getPlaylists()
  }) }  
} 
const navigate =useNavigate()
  return (
    <>
      <div className="playlist-card  shadow-[2px_2px_2px_2px_rgb(0,0,0,20%)] flex flex-col  h-[12rem] w-[18rem]  rounded-[10px] overflow-hidden">
        <div onClick={()=>navigate(`/playlists/${id}`)} className="img-overlay h-[85%] overflow-hidden flex cursor-pointer">
          <div className="img-container ">
            <img
              src={!firstvideo?placeholder:firstvideo}
              alt=""
              className=" w-full object-fill "
            />
          </div>
          <div onClick={()=>navigate(`/playlists/${id}`)} className="absolute w-[4rem] h-[10.2rem]    bg-[rgba(0,0,0,0.6)]  flex flex-col justify-center items-center text-white">
            <MdOutlinePlaylistAdd className="text-[2rem] bg-transparent cursor-pointer"  />{videoCount}
          </div>
        </div>
        <div className="playlist-detail flex justify-between items-center  text-white pt-1 ps-2 pe-2">
            <div onClick={()=>navigate(`/playlists/${id}`)} className="playlist-number ms-2 font-semibold cursor-pointer">{title}</div>
            <div onClick={handlePlaylistDelete} className="playlist-dlt-icon me-2 border-white border-[1px] p-[1px] border-solid cursor-pointer"><MdDelete/></div>
        </div>
      </div>
    </>
  );
}

export { PlayListcard };
