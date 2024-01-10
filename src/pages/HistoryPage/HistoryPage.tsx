import { useEffect } from "react";
import {
  BottomBar,
  CustomLoader,
  EmptyCard,
  Navbar,
  Sidebar,
  VideoCard,
} from "../../components/components";
import { useVideoStore } from "../../store/Videostore";

function HistoryPage() {
  const { history, getHistory, clearHistory, loader } = useVideoStore();
  useEffect(() => {
    getHistory();
  }, []);

  const clearBtnHistory = async () => {
    clearHistory();
  };
  return (
    <>
      <Navbar showSearch={false}></Navbar>

      <div className="main-content flex w-full  max-w-[100vw] ">
        <Sidebar></Sidebar>

        <div className="content-wrapper items-center w-full h-full flex flex-col ps-1 h-full">
          {history.length != 0 && (
            <div className="clear-button-container flex justify-center items-center pb-2 pt-2 ">
              <div
                onClick={clearBtnHistory}
                className="btn-clear cursor-pointer  text-white p-1 border-solid border-[1px] border-white rounded-[5px] font-semibold"
              >
                Clear History
              </div>
            </div>
          )}
          <div className="video-grid flex flex-wrap justify-center gap-3 p-1">
            {loader ? (
              <CustomLoader />
            ) : history.length == 0 ? (
              <EmptyCard
                message="Your History Empty!"
                type="View videos"
              ></EmptyCard>
            ) : (
              history.map((vid) => (
                <>
                  <VideoCard video={vid} type="history"></VideoCard>
                </>
              ))
            )}
          </div>
        </div>
      </div>
      <BottomBar></BottomBar>
    </>
  );
}

export { HistoryPage };
