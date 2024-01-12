import { useEffect, useState } from "react";
import { BottomBar, Navbar } from "../components/components";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();
  const [counter, setCounter] = useState<number>(10);
  useEffect(() => {
      const timer = counter > 0 && setTimeout(() =>setCounter(count=>count-1), 1000);
      if(counter===0){
          navigate("/")
      }
      return ()=>clearTimeout(timer as number)
    }, [counter]);
  return (
    <>
      <Navbar showSearch={false}></Navbar>
      <div className="main-content flex w-full  max-w-[100vw]  ">
        <div className="content-wrapper  items-center justify-center  w-full h-full flex flex-col pt-10 ps-3 pe-3">
          <h1 className="header-404 text-white text-semibold text-[2rem]">
            404
          </h1>
          <h2 className="text-white">
            Oops! You ran out of videos.
            </h2>
            <h2 className="text-white">
             The page you're looking for is now         

            beyond our reach. Let's get you ...
            <span className="txt-md lt-bold count-txt">Back in {counter}</span>

          </h2>
          <button onClick={()=>navigate("/")} className="text-white border-white border-[1px] border-solid  ps-2 pe-2 mt-4 hover:bg-black hover:text-white">Home</button>
        </div>
      </div>
      <BottomBar></BottomBar>
    </>
  );
}

export { ErrorPage };
