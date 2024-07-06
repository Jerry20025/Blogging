import { useNavigate } from "react-router-dom";
const LeftSidePannel = ({name}:{name:string}) => {
  const navigate=useNavigate()
  return (
    <div className="flex flex-col justify-evenly items-start gap-96 mt-[-20px]">
      <div>
      <div className="flex flex-col pt-4  gap-2 ">
    <div onClick={()=>{
        navigate("/post")
    }} className="rounded-lg w-24 text-center p-2 text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
        + Add Post
    </div>
    <div onClick={()=>{
        navigate("/mypost?name="+name)
    }} className="rounded-lg w-24 text-center p-2 text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">My Posts</div>
    <div onClick={()=>{
        navigate("/blogs")
    }} className="rounded-lg w-24 text-center p-2 text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">All Blogs</div>
    <div onClick={()=>{
        localStorage.clear();
        navigate("/");
        window.location.reload();
    }} className="rounded-lg w-24 text-center p-2 text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">LogOut</div>
    </div>
      </div>
      <div onClick={()=>{
        window.location.reload()
      }} className="rounded-lg w-24 text-center p-2 text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
        refresh
      </div>
    </div>
  )
}
export function ThreeComp(){
    
    return 
}

export default LeftSidePannel
