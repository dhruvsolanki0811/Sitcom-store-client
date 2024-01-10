import { useEffect } from "react";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import {
  BottomBar,
  CustomLoader,
  EmptyCard,
  Navbar,
  PlayListcard,
} from "../../components/components";
import { useVideoStore } from "../../store/Videostore";

function PlaylistPage() {
  const { playlists, getPlaylists, loader } = useVideoStore();

  useEffect(() => {
    getPlaylists();
  }, []);
  return (
    <>
      <Navbar showSearch={false}></Navbar>
      <div className="main-content flex w-full max-w-[100vw] ">
        <Sidebar></Sidebar>
        {loader ? (
          <div className="playlist-grid flex w-full flex-wrap justify-center pt-2 ps-3 pe-3 gap-9">
            <CustomLoader />
          </div>
        ) : playlists.length == 0 ? (
          <EmptyCard message="YOU HAVE 0 PLAYLISTS !" type="Add to Playlist" />
        ) : (
          <div className="playlist-grid flex w-full flex-wrap justify-center pt-2 ps-3 pe-3 gap-9">
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
        )}
      </div>
      <BottomBar></BottomBar>
    </>
  );
}

export { PlaylistPage };
