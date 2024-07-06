import Quote from '../components/Quote';
import SignupLeft from '../components/SignupLeft';
export const Signup = () => {
  return (
    <div className="flex flex-col md:flex-row w-full h-screen justify-center items-center">
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8">
        <SignupLeft/>
      </div>
      <div className="hidden md:flex flex-col justify-center items-center w-full md:w-1/2 bg-gray-100 p-8 h-full">
        <Quote/>
      </div>
    </div>
  )
}
