import { useNavigate } from 'react-router-dom';
export const AppBar=()=>{
    
    return <div className="border-b shadow-md flex justify-between py-4 px-16 items-center">
        <div className="lg:text-3xl sm:text-xl md:2xl flex flex-col justify-center font-extrabold font-mono">
           My Blogs
        </div>
        <div>
            <NavButton/>
        </div>
    </div>
}


export function App(){
    return <div className="border-b flex justify-between py-4 px-16">
    <div className="text-3xl flex flex-col justify-center font-extrabold font-mono">
       My Blogs
    </div>
    
</div>
}
function NavButton(){
    const navigate=useNavigate()
    const email=localStorage.getItem("email")
    return <div  className="lg:hidden md:inline-flex sm:inline-flex lg:px-4 md:px-2 sm:px-1 flex text-center justify-center gap-2 ">
    <div onClick={()=>{
        navigate("/post")
    }}  className="rounded-md  md:w-auto text-center lg:p-2 text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer md:text-sm md:p-1.5 sm:p-1.5">+Post</div>
    <div  onClick={()=>{
        navigate("/mypost?name="+email)
    }}  className="md:w-auto text-center lg:p-2 text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer md:text-sm md:p-1.5 sm:p-1.5 rounded-md ">My Posts</div>
    <div onClick={()=>{
    localStorage.clear();
    navigate("/");
    window.location.reload();
}} className="rounded-md md:w-auto text-center lg:p-2 text-white bg-black md:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer md:text-sm md:p-1.5 sm:p-1.5">LogOut
</div>
</div>
}