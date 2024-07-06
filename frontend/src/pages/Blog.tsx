import { useParams, useSearchParams } from 'react-router-dom';
import { Spinner } from '../components/Spinner';
import { FullBlog } from '../components/FullBlog';
import { singleBlog } from '../hooks/index';
export const Blog= () => {
    const [searchParam]=useSearchParams()
  const id=useParams();
  const check=searchParam.get("check")
  //@ts-ignore
  const{loader,blog}=singleBlog(id)
       
  if (loader) {
    return <div>
        
        <div className="h-screen flex flex-col justify-center"> 
            <div className="flex justify-center">
                <Spinner />
            </div>
        </div>
    </div>
    
}
else if(!blog){
    return <div className="h-screen flex flex-col justify-center"> 
    <div className="flex justify-center text-xl">
        No Blog Go Back
    </div>
</div>
}
return <div>
    
    <FullBlog blog={blog} isdelete={check?check:"no"} />
</div>
}
