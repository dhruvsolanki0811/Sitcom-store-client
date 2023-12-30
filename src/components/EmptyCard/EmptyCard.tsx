import placeholder from "../../assets/emptyImage.webp"
function EmptyCard({message,type}:{message:string,type:string}) {
  return (
    <>
    <div className="container flex flex-col mt-5 items-center gap-2">
    <div className="msg-empty text-sm text-white"> {message}</div>
    <div className="img-container w-[15rem] h-[12rem] overflow-hidden">
    <img src={placeholder} alt="" className="object-fill"/>
    </div>
    <div className="msg-empty text-sm hover:bg-zinc-700	 hover:text-white text-white p-2 border-white border-[1px] border-solid rounded-[5px] ">{type}</div>
    </div>
    </>
  )
}

export { EmptyCard}