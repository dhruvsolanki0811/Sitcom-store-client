import { Sidebar } from "../../components/Sidebar/Sidebar";
import { BottomBar, CustomLoader, Navbar, VideoCard } from "../../components/components";
import banner from "../../assets/brooklyn99-banner.jpg";
import { useEffect, useState } from "react";
import { Video, useVideoStore } from "../../store/Videostore";
function Homepage() {
  const [vid,setVid] =useState<Video[]>([])
  const {getVideo,loader}=useVideoStore()
    useEffect(()=>{
        getVideo().then((res)=>{
        if(res)
          setVid(res)})
    },[])
  
  return (
    <>
      <Navbar></Navbar>
      <div className="main-content flex w-full max-w-[100vw] ">
        <Sidebar></Sidebar>
        <div className="content-wrapper w-full flex flex-col ps-5">
          <div className="button-chip-wrapper  flex wrap-none gap-3">
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
          <div className="banner relative flex  mt-2 overflow-hidden  me-2 h-[18rem] rounded-[1rem]">
            <img
              src={banner}
              alt=""
              className="w-full object-cover object-center"
            />
          </div>
          
          <div className="video-grid flex flex-wrap justify-center mt-2 gap-3  p-1">
            {loader ?
          <CustomLoader type={true}></CustomLoader>
            : vid && vid.map((vid) => (
              <VideoCard video={vid}></VideoCard>
            ))}
          </div>
        </div>
      </div>
      <BottomBar></BottomBar>
    </>
  );
}

export { Homepage };
