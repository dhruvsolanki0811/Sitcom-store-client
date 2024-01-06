import  { useEffect } from 'react'
import { BottomBar, Navbar, VideoCard } from '../../components/components'
import { Sidebar } from '../../components/Sidebar/Sidebar'
import { useVideoStore } from '../../store/Videostore'

function ExplorePage() {
  const {getVideo,loader,videos}=useVideoStore()
    useEffect(()=>{
        getVideo()
        console.log("...")
    },[])
  
  return (
    <>
    <Navbar></Navbar>
      <div className="main-content flex w-full max-w-[100vw] ">
        <Sidebar></Sidebar>
        <div className="content-wrapper w-full h-full  flex flex-col ps-5">
          <div className="button-chip-wrapper w-full flex wrap-none gap-3">
            <div onClick={()=>{getVideo()}} className="button-chip  ps-[0.7rem] pe-[0.7rem] pt-1 pb-1 bg-[#05376B] text-white text-[0.8rem] rounded-full font-bold hover:bg-[#04478a] cursor-pointer ">
              All
            </div>
            <div onClick={()=>{getVideo({type:"category",value:"the office"})}} className="button-chip min-w-[5.5rem] ps-[0.7rem] pe-[0.7rem] pt-1 pb-1 bg-[#05376B] text-white text-[0.8rem] rounded-full font-bold hover:bg-[#04478a] cursor-pointer">
              The Office
            </div>
            <div onClick={()=>{getVideo({type:"category",value:"friends"})}} className="button-chip  ps-[0.7rem] pe-[0.7rem] pt-1 pb-1 bg-[#05376B] text-white text-[0.8rem] rounded-full font-bold hover:bg-[#04478a] cursor-pointer">
              Friends
            </div>
            <div onClick={()=>{getVideo({type:"category",value:"suits"})}} className="button-chip  ps-[0.7rem] pe-[0.7rem] pt-1 pb-1 bg-[#05376B] text-white text-[0.8rem] rounded-full font-bold hover:bg-[#04478a] cursor-pointer">
              Suits
            </div>
          </div>
          
          <div className="video-grid flex flex-wrap justify-center mt-2 gap-3  p-1">
            {videos.map((vid) => (
              <VideoCard video={vid}></VideoCard>
            ))}
          </div>
        </div>
      </div>
      <BottomBar></BottomBar>
    </>
  )
}

export  {ExplorePage}