import { useState } from "react"
import { SignupInput } from "@jerry2002/medium-common"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"
const SignupLeft = () => {
    const [postInputs,setpostInputs]=useState<SignupInput>({
      name:"",  
      email:"",
      password:"",
    })
    const [errorMsg,seterrorMsg]=useState("");
const navigate=useNavigate();
async function signupFxn(){
  try{
    const response=await axios.post(`${BACKEND_URL}/api/v1/user/signup`,postInputs);
    const jwt=response.data;
    localStorage.setItem("token",jwt);
    alert("Signin Now")
    navigate("/signin");
  }catch(error){
    //@ts-ignore
    const status=error.response.status;
    console.log("Error while Login",error);
    if (axios.isAxiosError(error) && error.response){
      if(status=== 400){
        seterrorMsg("check inputs or password size 6 or max");
      }else if(status=== 206){
        seterrorMsg("password required at least 6 length");
      }else{
        seterrorMsg("User Exists with this email");
      }
    }
  }
}
  return (
    <div>
        <div className="max-w-lg w-full space-y-8">
          <div>
            <h2 className="text-4xl font-bold text-center">Create an account</h2>
            <p className="mt-2 text-center text-lg text-gray-700 font-semibold">
              Already have an account?{" "}
              <a href="/signin" className="font-medium text-indigo-600 hover:text-indigo-500 underline">
                Login
              </a>
            </p>
          </div>
          <form className="mt-8 space-y-10 gap-10">
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="username" className="font-semibold text-lg">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your username"
                  onChange={(e)=>{
                    setpostInputs({
                      ...postInputs,
                      name:e.target.value
                    })
                  }}
                />
              </div>
              <div>
                <label htmlFor="email" className="font-semibold text-lg">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="m@example.com"
                  onChange={(e)=>{
                    setpostInputs({
                      ...postInputs,
                      email:e.target.value
                    });
                  }}
                />
              </div>
              <div>
                <label htmlFor="password" className="font-semibold text-lg">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  onChange={(e)=>{
                    setpostInputs({
                      ...postInputs,
                      password:e.target.value
                    })
                  }}
                />
              </div>
            </div>
            <div>
            {errorMsg && <p className="text-red-500 mb-5 mt-[-20px] font-semibold text-md text-center">{errorMsg}</p>}
              <button
                type="button"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={signupFxn}
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
  )
}
export default SignupLeft