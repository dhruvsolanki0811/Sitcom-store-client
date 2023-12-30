import React from 'react'
import { Navbar, VideoCard } from '../../components/components'
import { Sidebar } from '../../components/Sidebar/Sidebar'

function ExplorePage() {
  return (
    <>
    <Navbar></Navbar>
      <div className="main-content flex w-full max-w-[100vw] mt-3">
        <Sidebar></Sidebar>
        <div className="content-wrapper  flex flex-col ps-5">
          <div className="button-chip-wrapper w-full flex wrap-none gap-3">
            <div className="button-chip  ps-[0.7rem] pe-[0.7rem] pt-1 pb-1 bg-[#05376B] text-white text-[0.8rem] rounded-full font-bold hover:bg-[#04478a] cursor-pointer ">
              All
            </div>
            <div className="button-chip min-w-[5.5rem] ps-[0.7rem] pe-[0.7rem] pt-1 pb-1 bg-[#05376B] text-white text-[0.8rem] rounded-full font-bold hover:bg-[#04478a] cursor-pointer">
              The Office
            </div>
            <div className="button-chip  ps-[0.7rem] pe-[0.7rem] pt-1 pb-1 bg-[#05376B] text-white text-[0.8rem] rounded-full font-bold hover:bg-[#04478a] cursor-pointer">
              Friends
            </div>
            <div className="button-chip  ps-[0.7rem] pe-[0.7rem] pt-1 pb-1 bg-[#05376B] text-white text-[0.8rem] rounded-full font-bold hover:bg-[#04478a] cursor-pointer">
              Suits
            </div>
          </div>
          
          <div className="video-grid flex flex-wrap justify-center mt-2 gap-3  p-1">
            {[1, 2, 3, 4, 5, 6, 7,].map(() => (
              <VideoCard></VideoCard>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export  {ExplorePage}