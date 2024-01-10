import { useEffect } from "react"
import { BottomBar, CustomLoader, EmptyCard, Navbar, Sidebar, VideoCard } from "../../components/components"
import { useVideoStore } from "../../store/Videostore"

function LikedVideoPage() {
  const {liked,getLiked,loader} =useVideoStore()
  useEffect(()=>{
    getLiked()
  },[])
  return (
    <>
    <Navbar showSearch={false}></Navbar>
      <div className="main-content flex w-full max-w-[100vw] ">
        <Sidebar></Sidebar>
        <div className="content-wrapper items-center w-full flex flex-col ps-1">
          
          <div className="video-grid flex flex-wrap justify-center gap-3 p-1">
            {
            loader?
            <CustomLoader></CustomLoader>
            :
            liked.length==0? <EmptyCard message="Like Videos Is Currently Empty !" type="View videos"></EmptyCard>:liked.map((vid) => (
              <>
                <VideoCard video={vid} type="like"></VideoCard>
              </>
            ))}
          </div>
        </div>
      </div>
      <BottomBar></BottomBar>
    </>
  )
}

export {LikedVideoPage}