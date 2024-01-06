import "./Loader.css"
function CustomLoader({type=false}:{type?:boolean}) {
  return (
    <>
        <div className="custom-loader"></div>
{type && <div className="text text-white text-sm">Render Service my take time!</div>}
    </>
  )
}

export  {CustomLoader}