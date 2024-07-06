import { BlogCard } from "../components/BlogCard"
import { AppBar } from '../components/AppBar';
import {  useBlogs } from "../hooks";
import { Spinner } from '../components/Spinner';
//@ts-ignore
import LeftSidePannel from '../components/LeftSide';
import {  useSearchParams } from 'react-router-dom';
export const Blogs = () => {
    const [searchParams]=useSearchParams();
      const email=searchParams.get("name");
      //@ts-ignore
  //@ts-ignore
  const {loading,blogs}=useBlogs();
  if(loading){
    return <div className="flex justify-center items-center h-screen">
      <Spinner/>
    </div>
  }
  return <div className="w-screen h-screen overflow-hidden">
      <div className="fixed w-screen">
        <AppBar />
      </div>
      <div className="lg:text-end md:text-center max-[770px]:hidden py-4 px-16 lg:text-3xl sm:text-xl md:2xl flex flex-col justify-center font-extrabold font-mono">
        All Blogs
      </div>
        <div className="flex flex-row lg:translate-x-20 md:translate-x-16 sm:translate-x-12 pt-32 justify-between items-start ">
            <div className="fixed hidden lg:block mt-[-60px]">
              <LeftSidePannel name={email?email:""}/>
            </div>
            <div className="flex justify-center overflow-y-hidden sm:px-44 md:px-44 lg:px-[500px] lg:mt-[-60px]">
              <div className="max-w-3xl w-full overflow-y-scroll h-[600px] overflow-x-hidden">
                {blogs.map((item,idx)=><BlogCard
                  key={blogs[blogs.length-1-idx].id}
                  authorName={blogs[blogs.length-1-idx].author.name ||"anonymus"}
                  title={blogs[blogs.length-1-idx].title}
                  content={blogs[blogs.length-1-idx].content}
                  publishedDate=""
                  id={blogs[blogs.length-1-idx].id}
                  isdelete="no"
                />)} 
              </div>
          </div>
        </div>
  </div>
}
