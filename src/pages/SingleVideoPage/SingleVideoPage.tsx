import { Sidebar } from "../../components/Sidebar/Sidebar";
import {
  BottomBar,
  CommentBox,
  CustomLoader,
  Navbar,
  VideoCard,
} from "../../components/components";
import ReactPlayer from "react-player/youtube";
import { FaPlay } from "react-icons/fa6";
import { BiSolidLike } from "react-icons/bi";
import { FaRegClock } from "react-icons/fa";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import "./SingleVideoPage.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useVideoStore } from "../../store/Videostore";
import { useUserAuthStore } from "../../store/Authstore";
import { AiOutlineLike } from "react-icons/ai";
import { PlaylistModal } from "../../components/PlaylistModal/PlaylistModal";

function SingleVideoPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [video, setVideo] = useState<any>(null);
  const {
    getSingleVideo,
    videos,
    getVideo,
    addToHistory,
    loader,
    likedStatus,
    addLiked,
    deleteLiked,

    watchLaterStatus,
    addWatchlater,
    deleteWatchlater,
  } = useVideoStore();
  const { user } = useUserAuthStore();
  const [WatchPresent, setWatchPresent] = useState(false);

  const [isPlaylistOpen, setPlaylistOpen] = useState(false);
  const openModal = () => {
    setPlaylistOpen(true);
  };
  const closeModal = () => {
    setPlaylistOpen(false);
  };
  const [likeText, SetLikeText] = useState<string>("Like");
  const [watchlaterText, SetwatchlaterText] =
    useState<string>("Add to Watchlater");
  const [likeLoader, SetlikeLoader] = useState<boolean>(false);
  const [wLoader, setWLoader] = useState<boolean>(false);
  useEffect(() => {
    SetlikeLoader(true);
    setWLoader(true);
    if (id) {
      getVideo();
      getSingleVideo(parseInt(id)).then((res) => {
        setVideo(res);
      });
    }
    if (user.userId && id) {
      likedStatus(parseInt(id)).then((res: boolean) => {
        if (res) {
          SetLikeText("Liked");
        } else {
          SetLikeText("Like");
        }
      });

      watchLaterStatus(parseInt(id)).then((res: boolean) => {
        if (res) {
          SetwatchlaterText("Remove from Watchlater");
        } else {
          SetwatchlaterText("Add to Watchlater");
        }
      });
    }

    SetlikeLoader(false);
    setWLoader(false);
  }, [id]);

  const handleLike = () => {
    SetlikeLoader(true);

    if (likeText == "Liked") {
      deleteLiked(video.id).then(() => {
        likedStatus(video.id).then((res: boolean) => {
          if (res) {
            SetLikeText("Liked");
          } else {
            SetLikeText("Like");
          }
          SetlikeLoader(false);
        });
      });
    } else if (likeText == "Like") {
      addLiked(user.userId, video.id).then(() => {
        likedStatus(video.id).then((res: boolean) => {
          if (res) {
            SetLikeText("Liked");
          } else {
            SetLikeText("Like");
          }
          SetlikeLoader(false);
        });
      });
    }
  };

  const handleWatchlater = () => {

    setWLoader(true);
    if (watchlaterText == "Remove from Watchlater") {
      deleteWatchlater(video.id).then(() => {
        watchLaterStatus(video.id).then((res: boolean) => {
          if (res) {
            SetwatchlaterText("Remove from Watchlater");
          } else {
            SetwatchlaterText("Add to Watchlater");
          }
          setWLoader(false);
        });
      });
    } else if (watchlaterText == "Add to Watchlater") {
      addWatchlater(user.userId, video.id).then(() => {
        watchLaterStatus(video.id).then((res: boolean) => {
          if (res) {
            SetwatchlaterText("Remove from Watchlater");
          } else {
            SetwatchlaterText("Add to Watchlater");
          }
          setWLoader(false);
        });
      });
    }
  };
  return (
    <>
      <Navbar></Navbar>
      <div className="main-content flex w-full max-w-[100vw] ">
        <Sidebar></Sidebar>
        <div className="content-wrapper flex  ps-1 w-full m-w-full h-full">
          <div className="video-container flex  basis-[70%] grow-[10] flex-col">
            <div className="player-wrapper">
              <ReactPlayer
                className="react-player"
                width="100%"
                height="100%"
                playing={true}
                light={video?.image ?? ""}
                onStart={() => {}}
                url={`https://www.youtube.com/embed/${video?.url}`}
                controls={true}
                playIcon={
                  <>
                    <FaPlay className="text-white bg-transparent text-5xl" />
                  </>
                }
                onPlay={() => {
                  if (user.userId && video) {
                    addToHistory(user.userId, video?.id);
                  }
                }}
              ></ReactPlayer>
            </div>
            <div className="video-details-title text-white mt-2">
              {video?.title}
            </div>
            <div className="video-details-channel text-white mt-2 text-sm ">
              <span className="border-b-2 pb-1">{video?.creator} </span>
            </div>
            <div className="like-section flex justify-end gap-6 mt-3    ">
              <div className="like-sec-items flex gap-1 items-center cursor-pointer">
                {!user.userId ? (
                  <AiOutlineLike
                    onClick={() => {
                      navigate("/login");
                    }}
                    className="text-white text-xl"
                  />
                ) : likeLoader ? (
                  <></>
                ) : likeText == "Liked" ? (
                  <BiSolidLike
                    onClick={handleLike}
                    className="text-white text-xl"
                  />
                ) : (
                  <AiOutlineLike
                    onClick={handleLike}
                    className="text-white text-xl"
                  />
                )}

                {!user.userId ? (
                  <span
                    onClick={() => {
                      navigate("/login");
                    }}
                    className="text-white text-sm"
                  >
                    Like
                  </span>
                ) : likeLoader ? (
                  <CustomLoader />
                ) : (
                  <span onClick={handleLike} className="text-white text-sm">
                    {likeText}
                  </span>
                )}
              </div>
              <div className="like-sec-items flex gap-1 items-center cursor-pointer">
                {!user.userId ? (
                  <FaRegClock
                    onClick={() => navigate("/login")}
                    className="text-white text-xl"
                  />
                ) : wLoader ? (
                  <></>
                ) : (
                  <FaRegClock
                    onClick={handleWatchlater}
                    className="text-white text-xl"
                  />
                )}

                {!user.userId ? (
                  <span
                    onClick={() => navigate("/login")}
                    className="text-white text-sm"
                  >
                    Add to Watchlater
                  </span>
                ) : wLoader ? (
                  <CustomLoader />
                ) : (
                  <span
                    onClick={handleWatchlater}
                    className="text-white text-sm"
                  >
                    {watchlaterText}
                  </span>
                )}
              </div>
              <div
              onClick={() => {
                if (user.userId) {
                  openModal();
                } else {
                  navigate("/login");
                }
              }}
              className="like-sec-items flex gap-1 items-center cursor-pointer">
                <MdOutlinePlaylistAdd className="text-white text-xl" />
                <span 
                 className="text-white text-sm">Add to Playlist</span>
                
              </div>
              
            </div>
            {(isPlaylistOpen && id) && (
                    <PlaylistModal
                      id={parseInt(id)}
                      onClose={closeModal}
                      isOpen={isPlaylistOpen}
                    />
                  )}
                  {id&&<CommentBox videoId={parseInt(id)}></CommentBox>}
            </div>
          <div className="vertical-video-grid flex flex-col justify-center items-center gap-2 ps-5  basis-[30%]">
            {videos
              .filter((vid) => {
                if (id) {
                  return vid.id != parseInt(id);
                }
              })
              .slice(0, 4)
              .map((vid) => (
                <VideoCard video={vid}></VideoCard>
              ))}
          </div>
        </div>
      </div>
      <BottomBar></BottomBar>
    </>
  );
}

export { SingleVideoPage };
