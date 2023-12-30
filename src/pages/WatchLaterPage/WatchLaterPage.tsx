import { Navbar, Sidebar, VideoCard } from "../../components/components"

function WatchLaterPage() {
  return (
    <>
      <Navbar showSearch={false}></Navbar>

      <div className="main-content flex w-full max-w-[100vw] mt-3">
      <Sidebar></Sidebar>

        <div className="content-wrapper items-center w-full h-full flex flex-col ps-1 h-full">
          <div className="video-grid flex flex-wrap justify-center gap-3 p-1">
            {[1, 2,4,4 ].map(() => (
              <>
                <VideoCard type="watchlater"></VideoCard>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export { WatchLaterPage}