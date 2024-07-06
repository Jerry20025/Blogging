import { useEffect,useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"
export interface Blog{
    "content": string,
    "title": string,
    "id": string,
    "author": {
        "name": string
    }
}
export const useBlogs=()=>{
    const [loading,setLoading]=useState(true);
    const [blogs,setBlogs]=useState<Blog[]>([]);
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
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
    },[])

    return {
        loading,
        blogs
    }
}
export const singleBlog=({id}:{id:string})=>{
    const [loader,setLoading]=useState(true);
    const [blog,setBlogs]=useState<Blog>();
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
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
    },[id])

    return {
        loader,
        blog,
    }
}
