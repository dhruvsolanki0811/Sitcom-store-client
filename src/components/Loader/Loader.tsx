import "./Loader.css"
function CustomLoader({type=false}:{type?:boolean}) {
  return (
    <>
        <div className="custom-loader"></div>
{type && <div className="text text-white text-sm">Free Backend Render Service might take 2-3 min time!</div>}
    </>
  )
}

export  {CustomLoader}