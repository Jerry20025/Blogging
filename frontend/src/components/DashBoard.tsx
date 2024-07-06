import { Link } from "react-router-dom"
const DashBoard = () => {
  return (
    <div className="h-screen flex flex-col items-start p-12 gap-20">
      <div className="text-3xl font-bold font-mono p-8">
        Welcome! to My Blogs
      </div>
      <div className="text-xl p-8 shadow-md">
        Discover a world of insightful articles, captivating stories, and expert advice on a wide range of topics. Whether you're here to learn something new, stay updated on the latest trends, or just unwind with a good read, we've got you covered.
        I don't provide edit option to your blog, you have to delete your blog, that is why you need to be accurate.
      </div>
      <Link className="p-4 bg-gray-600 text-white font-bold shadow-md rounded-lg" to='/signin'>
         Let's Get Starts :)
      </Link>
    </div>
  )
}

export default DashBoard
