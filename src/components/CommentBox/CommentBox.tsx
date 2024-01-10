import { ChangeEvent, useEffect, useState } from "react"
import { Comment } from "./Comment"
import { axiosInstance } from "../../axios/axios"
import { CustomLoader } from "../components"
import { useUserAuthStore } from "../../store/Authstore"
import { useNavigate } from "react-router-dom"

interface CommentType{
  id:number,
  user:{
    id:number,
    first_name:string,
    last_name:string,
    email:string
  },
  video:number,
  text:string,
  created_at:string,
  parent_comment?:number,
  replies:CommentType[]
}

function CommentBox({videoId}:{videoId:number}) {
  const {user}=useUserAuthStore()
  const navigate=useNavigate()
  const [comments,SetComments]=useState<CommentType[]>([])
  const[CommentInput,SetCommentInput]=useState("")
  const CommentInputState=(e:ChangeEvent<HTMLInputElement>)=>{
    if(!user.userId){
      navigate('/login')
    }
    
    SetCommentInput(e.target.value)
  }


  
  const [loader,setLoader]=useState(false)
  const refreshComments = async () => {
    setLoader(true);
    try {
      const res = await axiosInstance.get(`/video/comments/video/${videoId}/`);
      SetComments(res.data);
    } catch (error) {
      console.error("Error refreshing comments:", error);
    } finally {
      setLoader(false);
    }
  };
  useEffect(()=>{
    refreshComments()
  }
   ,[videoId])


   const handleReply=()=>{
    if(!user.userId){
      navigate('/login')
    }
    else{
      axiosInstance.post(`/video/comments/`,{
        video:videoId,
        user:user.userId,
        text:CommentInput,
      }).then(()=>{refreshComments()
      SetCommentInput("")})
    }
  }
  return (
    <>
    <div className="flex flex-col  w-full  max-h-[60vh]  mt-4  mb-4 overflow-y-scroll">
    {loader?
    <CustomLoader></CustomLoader>
    :<><div className="input-container flex flex-col">
            <input
              type="text"
              value={CommentInput}
              onChange={CommentInputState}
              placeholder="Add a comment"
              className="reply-input  border-b-[0.1px] border-b-solid border-b-white m-2 bg-transparent outline-none text-white text-xs min-h-[1rem] h-[2rem] max-h-[5rem]"
            />
            <div className="input-btn flex justify-end">
              <div onClick={handleReply} className="submit-btn text-white text-xs  p-2 hover:text-green-700 cursor-pointer">
                submit
              </div>
            </div>
            </div>
        {comments.map((comment)=>{
            return <>
            <Comment comment={comment} refresh={refreshComments}></Comment>
            </>
        })
      }</>
      }
    </div>
          
    </>
  )
}

export  {CommentBox}