import { ChangeEvent, useState } from "react";
import { formatTimestamp } from "../../utils/utils";
import { useUserAuthStore } from "../../store/Authstore";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../axios/axios";
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

function Comment({comment,refresh}:{ comment:CommentType,refresh:()=>void}) {
const {user}=useUserAuthStore()
const navigate=useNavigate()
  const [viewReplies, SetViewReplies] = useState(false);
  const [showReplyInput, SetshowReplyInput] = useState(false);
  const [replyInput,SetReplyInput]=useState("")
  const replyInputState=(e:ChangeEvent<HTMLInputElement>)=>{
    if(!user.userId){
      navigate('/login')
    }
      SetReplyInput(e.target.value)
  }
const handleReply=()=>{
  if(!user.userId){
    navigate('/login')
  }
  else{
    axiosInstance.post(`/video/comments/`,{
      video:comment.video,
      user:user.userId,
      text:replyInput,
      parent_comment:comment.id
    }).then(()=>{refresh()
    SetReplyInput("")
    })
  }
}
  return (
    <>
      <div className="comment-container ps-2 pe-2 mt-2 w-full flex flex-col border-[#B1AEAF]  border-b-[1px] border-solid">
        <div className="title text-white">{comment.user.first_name} {comment.user.last_name}</div>
        <div className="comment-date text-xs text-[#B1AEAF] ">
        {formatTimestamp(comment.created_at)}
          </div>
        <div className="comment-text text-white text-sm ps-3 pe-3 text-justify mt-1 mb-1">
          {comment.text}
        </div>
        <div
          className="reply text-white w-[1rem] text-xs hover:text-blue-700 cursor-pointer"
          onClick={() => SetshowReplyInput(!showReplyInput)}
        >
          reply
        </div>
        {showReplyInput && (
          <>
            <input
              type="text"
              value={replyInput}
              onChange={replyInputState}
              placeholder="Add a comment"
              className="reply-input  border-b-[0.1px] border-b-solid border-b-white m-2 bg-transparent outline-none text-white text-xs min-h-[1rem] h-[2rem] max-h-[5rem]"
            />
            <div className="input-btn flex justify-end">
              <div onClick={handleReply} className="submit-btn text-white text-xs  p-2 hover:text-green-700 cursor-pointer">
                submit
              </div>
            </div>
          </>
        )}
        <div
          className="replies-btn w-[6
            
            
            rem] text-white text-xs hover:text-blue-700 cursor-pointer mt-2 mb-2 "
          onClick={() => SetViewReplies(!viewReplies)}
        >
          {"  "}

          {!viewReplies ? `view replies (${comment.replies.length})` : "hide replies"}
        </div>
        {viewReplies && (
          <div className="input-container flex flex-col">
            {/*  */}
            <div className="replies-container ms-6">
              {comment.replies.map((reply) => (
                <>
                  <div className="title text-white text-sm">
                    {reply.user.first_name} {reply.user.last_name}
                  </div>
                  <div className="comment-date text-[0.7rem] text-[#B1AEAF] ">
                    {formatTimestamp(reply.created_at)}
                  </div>
                  <div className="comment-text text-white text-xs ps-3 pe-3 text-justify mt-1 mb-1">
                    {reply.text}
                  </div>
                </>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export { Comment };
