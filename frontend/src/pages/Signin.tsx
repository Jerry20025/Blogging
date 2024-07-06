import Quote from '../components/Quote';
import SigninLeft from '../components/SigninLeft';

export const Signin = () => {
  return (
    <div className="flex flex-col md:flex-row w-full h-screen justify-center items-center overflow-y-hidden">
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8">
        <SigninLeft/>
      </div>
      <div className="hidden md:flex flex-col justify-center items-center w-full md:w-1/2 bg-gray-100 p-8 h-full">
        <Quote/>
      </div>
    </div>
  )
}

