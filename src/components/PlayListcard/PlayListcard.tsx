import placeholder from "../../assets/empty-playlist.png";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useVideoStore } from "../../store/Videostore";
import "./PlayListcard.css"
function PlayListcard({
  id,
  title,
  firstvideo,
  videoCount,
}: {
  id: number | null;
  title: string;
  firstvideo?: string;
  videoCount: number;
}) {
  const { getPlaylists, deletePlaylist } = useVideoStore();
  const handlePlaylistDelete = () => {
    if (id) {
      deletePlaylist(id).then(() => {
        getPlaylists();
      });
    }
  };
  const navigate = useNavigate();
  return (
    
    <>

      <div className="card-container cursor-pointer grid shadow-[2px_2px_2px_2px_rgb(0,0,0,20%)]  h-[14rem] w-[18rem] min-w-[18rem] ">
        <div className="img-overlay ">
          <img
            src={!firstvideo ? placeholder : firstvideo}
            className="object-cover w-full  h-full "
          />
        </div>
        <div className="card-overlay inline w-100 flex flex-col justify-center items-end    ">

          <div className="h-full flex flex-col text-white justify-center items-center ps-4 pe-4 bg-black bg-[rgba(0,0,0,0.75)]" onClick={() => navigate(`/playlists/${id}`)}>
          <MdOutlinePlaylistAdd className="text-[2rem] bg-transparent cursor-pointer" />
            {videoCount}
          </div>
        </div>
        <div className="playlist-detail flex justify-between items-center  text-white pt-1 ps-2 pe-2">
          <div
            onClick={() => navigate(`/playlists/${id}`)}
            className="playlist-number ms-2 font-semibold cursor-pointer"
          >
            {title}
          </div>
          <div
            onClick={handlePlaylistDelete}
            className="playlist-dlt-icon me-2 border-white border-[1px] p-[1px] border-solid cursor-pointer"
          >
            <MdDelete />
          </div>
        </div>
      </div>
    </>
  );
}

export { PlayListcard };
