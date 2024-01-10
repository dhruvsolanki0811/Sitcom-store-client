import { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { FaRegClock } from "react-icons/fa";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useVideoStore } from "../../store/Videostore";
import { PlayListcard } from "../components";
import { PlaylistModal } from "../PlaylistModal/PlaylistModal";
import { useUserAuthStore } from "../../store/Authstore";

interface Video {
  id: number | null;
  title: string | null;
  creator: string | null;
  category: string | null;
  logo: string | null;
  image: string | null;
  url: string | null;
}
type typeProp = "list" | "like" | "watchlater" | "history" | "playlist";
function VideoCard({
  type = "list",
  video,
  playlistId,
}: {
  type?: typeProp;
  video: Video;
  playlistId?: number;
}) {
  const navigate = useNavigate();
  const [watchLoader, setWatchLoader] = useState(false);
  const [WatchPresent, setWatchPresent] = useState(false);

  const [isPlaylistOpen, setPlaylistOpen] = useState(false);
  const openModal = () => {
    if (user.userId) {
      setWatchLoader(true);
      watchLaterStatus(video.id)
        .then((response: boolean) => {
          setWatchPresent(response);
          setWatchLoader(false);
        })
        .catch(() => setWatchLoader(false));
    }
    setPlaylistOpen(true);
  };

  const closeModal = () => {
    setPlaylistOpen(false);
  };

  const [ShowMenu, setShowMenu] = useState(false);
  const toggleShow = () => {
    setShowMenu(!ShowMenu);
  };
  const { user } = useUserAuthStore();
  const {
    deleteHistory,
    getHistory,
    deleteLiked,
    getLiked,
    deleteWatchlater,
    getWatchlater,
    removeFromPlaylist,
    getPlaylistVideo,
    watchLaterStatus,
    addWatchlater,
  } = useVideoStore();

  const handleWatchLater = () => {
    setWatchLoader(true);
    if (WatchPresent) {
      deleteWatchlater(video.id).then(() => {
        watchLaterStatus(video.id).then((res: boolean) => {
          if (res) {
            setWatchPresent(true);
          } else {
            setWatchPresent(false);
          }
          setWatchLoader(false);
        });
      });
    } else if (!WatchPresent) {
      addWatchlater(user.userId, video.id).then(() => {
        watchLaterStatus(video.id).then((res: boolean) => {
          if (res) {
            setWatchPresent(true);
          } else {
            setWatchPresent(false);
          }
          setWatchLoader(false);
        });
      });
    }
  };
  const handleTrashButton = () => {
    if (type == "history") {
      deleteHistory(video.id).then(() => {
        getHistory();
      });
    } else if (type == "like") {
      deleteLiked(video.id).then(() => {
        getLiked();
      });
    } else if (type == "watchlater") {
      deleteWatchlater(video.id).then(() => {
        getWatchlater();
      });
    } else if (type == "playlist") {
      if (playlistId && video.id)
        removeFromPlaylist(playlistId, video.id).then(() =>
          getPlaylistVideo(playlistId)
        );
    }
  };
  return (
    <>
      <div className="video-card flex flex-col  cursor-pointer min-w-[16.6rem] w-[16.9rem]  h-[14rem] gap-1 shadow-[2px_2px_2px_2px_rgb(0,0,0,20%)]">
        <div
          onClick={() => {
            navigate(`/video/${video.id}`);
          }}
          className="vid-img-wrapper h-[70%]  rounded-[0.3rem] overflow-hidden"
        >
          <img
            src={video.image ?? ""}
            className="h-full w-full object-fill "
            alt=""
          />
        </div>
        <div className="vid-details-wrapper ps-1 pe-1    flex jusitfy-between items-center h-[25%] text-white font-bold text-xs">
          <div className="channels-photo overflow-hidden h-9  rounded-full w-[12%]">
            <img src={video.logo ?? ""} alt="" />
          </div>

          <div className="tile-channel-wrapper flex flex-col ps-2 pe-2 w-[81%]">
            <div className="video-title text-ellipsis overflow-hidden whitespace-nowrap ">
              {video.title}
            </div>
            <div className="video-channel">{video.creator}</div>
          </div>

          {type == "list" ? (
            <div
              onClick={toggleShow}
              className="video-option flex items-center text-[1rem] h-full"
            >
              <HiDotsVertical />
            </div>
          ) : (
            <div
              onClick={handleTrashButton}
              className="video-option flex items-center text-[1rem] h-full"
            >
              <MdDelete />
            </div>
          )}
          {ShowMenu && (
            <>
              <div className="show-menu flex flex-col gap-1 absolute bg-[#1f2028] mb-[15px] ms-[5rem] h-[4.5rem]  w-[10rem] rounded-[10px]">
                <div
                  onClick={handleWatchLater}
                  className="menu-items ps-3 pt-2 pb-2 flex gap-2 items-center rounded-[6px] border-white border-[1px] border-solid"
                >
                  <FaRegClock className="text-[1.2rem]"></FaRegClock>
                  <div className="menu-text">
                    {WatchPresent
                      ? "Remove from watchlater"
                      : "Add to watchlater"}
                  </div>
                </div>
                <div
                  onClick={() => {
                    if (user.userId) {
                      openModal();
                    } else {
                      navigate("/login");
                    }
                  }}
                  className="menu-items bg-[#1f2028] h-10 ps-3 pt-2 pb-2 flex gap-2 items-center border-white rounded-[6px] border-[1px] border-solid"
                >
                  <MdOutlinePlaylistAdd className="text-[1.2rem]"></MdOutlinePlaylistAdd>

                  <div className="menu-text text-xs">Add to Playlist</div>
                  {isPlaylistOpen && (
                    <PlaylistModal
                      id={video.id}
                      onClose={closeModal}
                      isOpen={isPlaylistOpen}
                    />
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export { VideoCard };
