import { Spinner } from "../components/Spinner";
import { useEffect,useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { BlogCard } from "../components/BlogCard";
import { Blog } from "../hooks";
import LeftSidePannel from "../components/LeftSide";
import { AppBar } from "../components/AppBar";
const MyPost = () => {
    const authId=localStorage.getItem("authorId");
    const email=localStorage.getItem("email")
    //@ts-ignore
    const [loading,setLoading]=useState(true);
    const [blogs,setBlogs]=useState<Blog[]>([]);
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/allpost/${authId}`,{
            headers:{
                Authorization: localStorage.getItem("token")
            }
        }
        )
        .then(response=>{
            setBlogs(response.data.blog);
            setLoading(false);
            }
        )
    },[authId])
    let reversedNumbers: Blog[] = [...blogs].reverse();
    if(loading){
      return <div className="flex justify-center items-center h-screen">
        <Spinner/>
      </div>
    }
    else if(blogs.length===0){
      return <div className="h-screen flex flex-col justify-center"> 
    <div className="flex justify-center text-xl w-auto p-4">
        No Blogs, Kindly add a post to see your all post, I have forgotten to add a route and needs little change in db
    </div>
</div>

    }
  return (
    <div className="w-screen h-screen overflow-hidden">
      <div className="fixed w-screen ">
        <AppBar/>
      </div>
      <div className="lg:text-end md:text-center max-[770px]:hidden py-4 px-16 lg:text-3xl sm:text-xl md:2xl flex flex-col justify-center font-extrabold font-mono">
        All My Post
      </div>
        <div className="flex flex-row lg:translate-x-18 md:translate-x-16 sm:translate-x-12 pt-32 justify-between items-start ">
            <div className="fixed hidden lg:block mt-[-60px]">
              <LeftSidePannel name={email?email:""}/>
            </div>
            <div className="flex justify-center overflow-y-hidden sm:px-44 md:px-44 lg:px-[500px] lg:mt-[-60px]">
              <div className="max-w-3xl w-full overflow-y-scroll h-[600px] overflow-x-hidden">
                {reversedNumbers.map(blog=><BlogCard
                  key={blog.id}
                  authorName={blog.author.name||"anonymus"}
                  title={blog.title}
                  content={blog.content||"no content available"}
                  publishedDate=""
                  id={blog.id}
                  isdelete="yes"
                />)} 
        
              </div>
              
          </div>
        </div>
  </div>
  )
}
//@ts-ignore


export default MyPost
