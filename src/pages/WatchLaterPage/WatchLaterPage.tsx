import { useEffect } from "react"
import { BottomBar, EmptyCard, Navbar, Sidebar, VideoCard } from "../../components/components"
import { useVideoStore } from "../../store/Videostore"

function WatchLaterPage() {
  const {watchlater,getWatchlater} =useVideoStore()
  useEffect(()=>{
    getWatchlater()
  },[])
  return (
    <>
      <Navbar showSearch={false}></Navbar>

      <div className="main-content flex w-full max-w-[100vw] ">
      <Sidebar></Sidebar>

        <div className="content-wrapper items-center w-full h-full flex flex-col ps-1 h-full">
          <div className="video-grid flex flex-wrap justify-center gap-3 p-1">
            {watchlater.length===0?<EmptyCard message="Your Watchlater list is Empty!" type="View videos"></EmptyCard>:watchlater.map((vid) => (
              <>
                <VideoCard video={vid} type="watchlater"></VideoCard>
              </>
            ))}
          </div>
        </div>
      </div>
      <BottomBar></BottomBar>
    </>
  )
}

export { WatchLaterPage}