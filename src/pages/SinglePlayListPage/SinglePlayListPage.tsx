import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BottomBar, CustomLoader, EmptyCard, Navbar, Sidebar, VideoCard } from "../../components/components";
import { useVideoStore } from "../../store/Videostore";

function SinglePlayListPage() {
  const { id } = useParams();
  const {getPlaylistVideo,playlistVideos}=useVideoStore()
  useEffect(() => {
    if(id)
    {getPlaylistVideo(parseInt(id))}
  }, [id]);
  return (
    <>
      <Navbar showSearch={false}></Navbar>

      <div className="main-content flex w-full max-w-[100vw] ">
      <Sidebar></Sidebar>

        <div className="content-wrapper items-center w-full h-full flex flex-col ps-1 h-full">
        
          <div className="video-grid flex flex-wrap justify-center gap-3 p-1">
            {
            playlistVideos.length==0?
            <EmptyCard message="There is currently 0 videos to your playlist" type="View Videos" />
            :
            playlistVideos.map((vid) => (
              <>
                {id&&<VideoCard video={vid} playlistId={parseInt(id)} type="playlist" ></VideoCard>}
              </>
            ))}
          </div>
        </div>
      </div>
      <BottomBar></BottomBar>
    </>
  );
}

export { SinglePlayListPage };
