import {
  ChangeEvent,
  FormEvent,

  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuthStore } from "../../store/Authstore";
import { useVideoStore } from "../../store/Videostore";
interface Playlist {
  id: number;
  is_video_present: boolean;
  playlist_name: string;
}
function PlaylistModal({
  id,
  isOpen,
  onClose,
}: {
  id: number | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [videoPlaylist, setvideoPlaylist] = useState<Playlist[]>([]);
  const [titleInput, SetTitleInput] = useState("");

  const { user } = useUserAuthStore();
  const {
    createPlaylist,
    getPlaylistByVideo,
    removeFromPlaylist,
    addToPlaylist,
  } = useVideoStore();
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);

  const closeModal = () => {
    onClose();
  };

  const handleOutsideClick = (e: MouseEvent) => {
    const closeButton = document.querySelector(".close-btn");
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      closeModal();
    }
    if (e.target == closeButton) {
      closeModal();
    }
  };
  useEffect(() => {

    document.addEventListener("mousedown", handleOutsideClick);
    if (id)
      getPlaylistByVideo(id).then((res) => {
        setvideoPlaylist(res);
      });
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  const inputUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    SetTitleInput(value);
  };
  const newPlaylistHandler = (e: FormEvent) => {
    e.preventDefault();
    createPlaylist(titleInput).then(() => {
      if (id)
        getPlaylistByVideo(id).then((res) => {
          setvideoPlaylist(res);
        });
      SetTitleInput("");
    });
  };

  const handleCheckBox = (checked:boolean, Playid: number) => {
    if (!checked && id) {
        removeFromPlaylist(Playid, id).then(() =>
          getPlaylistByVideo(id).then((res) => {
            setvideoPlaylist(res);
          })
        );
    }else if(checked && id){
        
        addToPlaylist(Playid, id).then(() =>
        getPlaylistByVideo(id).then((res) => {
          setvideoPlaylist(res);
        })
      );
    }
  };
  return (
    <>
      <div
        className={`fixed bg-[rgb(0,0,0,40%)] z-[10000] top-0 left-0 w-full cursor-default h-full flex items-center justify-center ${
          isOpen ? "visible" : "invisible"
        }`}
      >
        <div
          ref={modalRef}
          className="bg-[#1f2028] cursor-pointer rounded-md p-6 shadow-md w-[15rem]"
        >
          <div className="close-btn w-full flex justify-end text-white">X</div>

          <div className="playlist-list  flex flex-col gap-1">
            {videoPlaylist.map((playlist) => (
                <div className="li-items flex gap-3">
                  <input
                    type="checkbox"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleCheckBox(e.target.checked,playlist.id)}
                    checked={playlist.is_video_present}

/>

                  <div className="text truncate text-white  text-xs font-semibold">{playlist.playlist_name}</div>
                </div>
              ))}
            <form
              onSubmit={newPlaylistHandler}
              className="create-playlist-form"
            >
              <input
                type="text"
                name="title"
                value={titleInput}
                onChange={inputUpdate}
                className="playlist-input mt-3 text-xs border-b-[1px] border-b-[1px] border-b-white bg-transparent w-full text-white p-1 outline-none"
                required
                placeholder="Enter Playlist Name"
              />
              {user.userId ? (
                <button type="submit" className="btn mt-3 text-white font-semibold text-xs">
                  Create
                </button>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="btn mt-3 text-white font-semibold text-xs"
                >
                  Create
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export { PlaylistModal };
