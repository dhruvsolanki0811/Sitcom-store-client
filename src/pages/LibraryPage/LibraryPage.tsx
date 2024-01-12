import { useEffect } from "react";
import { BottomBar, Navbar, PlayListcard, Sidebar, VideoCard } from "../../components/components";
import { useVideoStore } from "../../store/Videostore";

function LibraryPage() {
  const { getHistory,getLiked,getPlaylists,getWatchlater,history,watchlater,liked,playlists } = useVideoStore();
  useEffect(() => {
    getLiked()
    getHistory()
    getPlaylists()
    getWatchlater()
  }, []);
  return (
    <>
      <Navbar showSearch={false}></Navbar>
      <div className="main-content flex w-full  max-w-[100vw] ">
        <Sidebar></Sidebar>
        <div className="content-wrapper flex flex-col h-full w-full ps-1  ">
          <div className="liked-row  border-b-white border-b-[2px] border-b-solid pt-4 pb-4">

            <div className="card-container flex flex-nowrap overflow-hidden overflow-x-auto	gap-2">
              {liked.map((vid) => (
                <VideoCard video={vid} type="library"/>
              ))}
            </div>
            <div className="btn mt-2 rounded-[4px]  text-white flex justify-center w-[3.4rem] border-white border-[1px] border-solid p-1">Liked</div>
          </div>
          <div className="history-row flex flex-col border-b-white border-b-[2px] border-b-solid pt-4 pb-4">
            <div className="card-container flex flex-nowrap overflow-hidden overflow-x-auto	gap-2">
              {history.map((vid) => (
                <VideoCard video={vid} />
              ))}
            </div>
            <div className="btn mt-2 rounded-[4px]  text-white flex justify-center w-[3.9rem] border-white border-[1px] border-solid p-1">History</div>

          </div>

          <div className="watchlater-row flex flex-col border-b-white border-b-[2px] border-b-solid pt-4 pb-4">
            <div className="card-container flex flex-nowrap overflow-hidden overflow-x-auto	gap-2">
              {watchlater.map((vid) => (
                <VideoCard video={vid} />
              ))}
            </div>
            <div className="btn mt-2 rounded-[4px]  text-white flex justify-center w-[6rem] border-white border-[1px] border-solid p-1">Watchlater</div>

          </div>

          <div className="Playlist-row flex flex-col border-b-white border-b-[2px] border-b-solid pt-4 pb-4">
            <div className="card-container flex flex-nowrap overflow-hidden overflow-x-auto	gap-2">
            {playlists.map((playlist) =>
              playlist.videos.length == 0 ? (
                <PlayListcard
                  id={playlist.id}
                  title={playlist.title}
                  videoCount={playlist.videos.length}
                />
              ) : (
                <PlayListcard
                  id={playlist.id}
                  title={playlist.title}
                  videoCount={playlist.videos.length}
                  firstvideo={playlist.videos[0].image}
                />
              )
            )}
            
            </div>
            <div className="btn mt-2 rounded-[4px]  text-white flex justify-center w-[4.3rem] border-white border-[1px] border-solid p-1">Playlist</div>

          </div>
        </div>
      </div>
      <BottomBar></BottomBar>
    </>
  );
}

export { LibraryPage };
