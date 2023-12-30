import { Navbar, Sidebar, VideoCard } from "../../components/components";

function HistoryPage() {
  return (
    <>
      <Navbar showSearch={false}></Navbar>

      <div className="main-content flex w-full max-w-[100vw] mt-3">
        <Sidebar></Sidebar>

        <div className="content-wrapper items-center w-full h-full flex flex-col ps-1 h-full">
          <div className="clear-button-container flex justify-center items-center pb-2 pt-2 ">
            <div className="btn-clear text-white p-1 border-solid border-[1px] border-white rounded-[5px] font-semibold">
              Clear History
            </div>
          </div>
          <div className="video-grid flex flex-wrap justify-center gap-3 p-1">
            {[1, 2, 4, 4,5,6,7,8,9,0,12,2,32,1,2].slice(0,2 ).map(() => (
              <>
                <VideoCard type="history"></VideoCard>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export { HistoryPage };
