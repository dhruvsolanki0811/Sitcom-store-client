import { Sidebar } from "../../components/Sidebar/Sidebar"
import { EmptyCard, Navbar, PlayListcard } from "../../components/components"

function PlaylistPage() {
  return (
    <>
    <Navbar showSearch={false}></Navbar>
        <div className="main-wrapper flex w-full max-w-[100vw] mt-5">
          <Sidebar></Sidebar>
          {false?
          <EmptyCard message="YOU HAVE 0 PLAYLISTS !" type="Add to Playlist"/>
          :<div className="playlist-grid flex flex-wrap justify-center mt-2 ps-3 pe-3 gap-9">
              {[1,2,3,4,5].map(()=><PlayListcard/>)}
          </div>}
        </div>
    </>
  )
}

export  {PlaylistPage}