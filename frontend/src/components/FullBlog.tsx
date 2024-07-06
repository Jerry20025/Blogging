import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Blog } from "../hooks";

export function FullBlog({ blog, isdelete }: { blog: Blog, isdelete: string }) {
  const {id }= useParams();
  const navigate = useNavigate();

  const handleDelete = () => {
    console.log(id)
    //@ts-ignore
    axios.delete(`${BACKEND_URL}/api/v1/blog/blog-delete`,
        {
            headers:{
                Authorization: localStorage.getItem("token")
            },
            data:{
                id,
            }
        }
    )
    .then(() => {
      navigate("/mypost");
    })
    .catch(error => {
      console.error("There was an error deleting the blog!", error);
    });
  };

  if (isdelete === "yes") {
    return (
      <div className="pt-16">
        <div className="flex justify-center">
          <div className="flex lg:flex-row sm:flex-col-reverse md:sm:flex-col-reverse px-16 w-full max-w-screen-xl pt-12 lg:justify-between md:justify-center md:gap-12">
            <div className="shadow-lg lg:w-[800px] flex justify-between p-4">
              <Body blog={blog} />
              <div
                onClick={handleDelete}
                className="h-6 px-8 text-center w-auto text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
              >
                delete
              </div>
            </div>
            <div className="col-span-4 w-auto p-4">
              <div className="text-black text-lg">Author</div>
              <div className="flex w-full shadow-md">
                <div className="pr-4 flex flex-col justify-start"></div>
                <div>
                  <div className="text-xl font-bold">
                    {blog.author.name || "Anonymous"}
                  </div>
                  <div className="pt-2 text-slate-500 w-40 h-28 overflow-y-hidden">
                    Random catch phrase about the author's for user's attention.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <GoBack/>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <div className="flex justify-center">
        <div className="flex lg:flex-row sm:flex-col-reverse md:sm:flex-col-reverse px-16 w-full max-w-screen-xl pt-12 lg:justify-between md:justify-center md:gap-12">
          <div className="shadow-lg lg:w-[800px] flex justify-between p-4">
            <Body blog={blog} />
          </div>
          <div className="col-span-4 w-auto p-4">
            <div className="text-black text-lg">Author</div>
            <div className="flex w-full shadow-md">
              <div className="pr-4 flex flex-col justify-start"></div>
              <div>
                <div className="text-xl font-bold">
                  {blog.author.name || "Anonymous"}
                </div>
                <div className="pt-2 text-slate-500 w-40 h-28 overflow-y-hidden">
                  Random catch phrase about the author's for user's attention.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        <GoBack/>
    </div>
  );
}

function Body({ blog }: { blog: Blog }) {
  return (
    <div className="h-auto">
      <div className="lg:text-5xl md:text-4xl font-extrabold sm:text-md">
        {blog.title}
      </div>
      <div className="text-slate-500 pt-2">Post on 2nd December 2023</div>
      <div className="pt-4">{blog.content}</div>
    </div>
  );
}
function GoBack(){
  const navigate=useNavigate();
  return <div className="flex md:justify-center sm:justify-center lg:justify-start mt-12 px-72">
  <div onClick={()=>{navigate("/blogs")}} className="bg-black text-white p-3 text-ce rounded-lg cursor-pointer w-auto">
    Go Back
  </div>
</div>
}
