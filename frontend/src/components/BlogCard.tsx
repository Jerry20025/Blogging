import { Link} from "react-router-dom";
interface BlogCardProps{
    id:string;
    authorName:string;
    title:string;
    content:string;
    publishedDate:string;
    isdelete:string;
}
//@ts-ignore
export const BlogCard=({authorName,title,content,publishedDate,id,isdelete}:BlogCardProps)=>{
    return <Link to={`/blog/${id}/?check=${isdelete}`}>
        <div className="shadow-lg border-slate-200 p-6 cursor-pointer lg:w-[800px] md:w-[400px]">
            <div className="flex  ">
                <div className="font-extralight pl-2 flex justify-center flex-col">
                    {authorName}
                </div>
                <div className="flex justify-center flex-col pl-2 ">
                    <Circle/>
                </div>
                <div className="pl-2 font-thin text-slate-500 flex justify-center flex-col">
                    {publishedDate}
                </div>
            </div>
            <div className="text-xl font-semibold hover:font-bold">
                {title}
            </div>
            <div className="text-md font-light pt-2">
                {content.slice(0,100,)+ "...."}
            </div>
            <div className="text-slate-500 font-thin pt-6">
                {`${Math.ceil(content.length / 100)} minutes(s) read`}
            </div>
        </div>
    </Link>
}
function Circle(){
    return <div className="h-1 w-1 rounded-full bg-slate-500">

    </div>
}
