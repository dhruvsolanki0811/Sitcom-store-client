import { Sidebar } from "../../../components/Sidebar/Sidebar";
import { Navbar } from "../../../components/components";
import { IoPerson } from "react-icons/io5";
import { FaKey } from "react-icons/fa";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa";

function AuthLogin() {
    const[passwordShown,setPasswordShown]=useState(false)
  return (
    <>
    <Navbar showSearch={false}/>
    <div className="main-content flex w-full max-w-[100vw] mt-3">

    <div className="content-wrapper flex flex-nowrap w-full items-center justify-center mt-10">
        <div className="login-box flex flex-col gap-2 ps-2 pe-2  items-center  h-[20rem] w-[20rem] bg-transparent">
                <div className="login-box-title text-white font-bold text-xl">Login</div>
                <div className="login-box-input w-full rounded-[10px] mt-3 flex gap-3 items-center ps-2 pe-2 pt-[2px] pb-[1px] h-[2.4rem]  overflow-hidden border-[2px] border-solid border-[#04478a]">
                    <IoPerson className="text-white text-xl"/>
                    <input type="text" placeholder="Email" className="text-white text-[1rem] bg-transparent outline-none border-none h-full w-[95%]"/>
                </div>
                <div className="login-box-input w-full rounded-[10px] flex gap-3 items-center ps-2 pe-2 pt-[2px] pb-[1px] h-[2.4rem]  overflow-hidden border-[2px] border-solid border-[#04478a]">
                    <FaKey className="text-white text-l"/>
                    <input type={passwordShown?"text":"password"} placeholder="Password" className="text-white text-[1rem] bg-transparent outline-none border-none h-full w-[90%]"/>
                    <FaRegEye onClick={()=>{setPasswordShown(!passwordShown); console.log(setPasswordShown)}} className="cursor-pointer text-white text-l"/>

                </div>
                {/* <div className="login-box-forgot"> </div> */}
                <div className="login-box-button w-full h-[2rem] rounded-[10px] bg-[#05386b] mt-2 text-white flex justify-center items-center text-[1rem] font-semibold">Login</div>
                <div className="login-box-button ps-3 pe-3 h-[2rem] rounded-[10px] bg-[#05386b] mt-3 text-white flex justify-center items-center text-[1rem] font-semibold">Login as Guest</div>
                <div className="create-link text-white text-xs font-semibold mt-3">Dont have an account? </div>
                <div className="create-link text-[#05386b] font-semibold">Create one!</div>
             </div>
    </div>
    </div>
    </> 
  )
}

export {AuthLogin}