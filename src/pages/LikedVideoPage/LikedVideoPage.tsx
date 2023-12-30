import { Navbar, Sidebar, VideoCard } from "../../components/components"

function LikedVideoPage() {
  return (
    <>
    <Navbar showSearch={false}></Navbar>
      <div className="main-content flex w-full max-w-[100vw] mt-3">
        <Sidebar></Sidebar>
        <div className="content-wrapper items-center w-full flex flex-col ps-1">
          
          <div className="video-grid flex flex-wrap justify-center gap-3 p-1">
            {[1,2,3,].map(() => (
              <>
                <VideoCard type="like"></VideoCard>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export {LikedVideoPage}