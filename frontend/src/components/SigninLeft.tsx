import { SigninInput } from "@jerry2002/medium-common"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"

const SigninLeft = () => {
  const [logs,setLogs]=useState<SigninInput>({
      email:"",
      password:""
    })  
      const navigate=useNavigate();
      const [errorMsg,seterrorMsg]=useState("");
  async function signinFxn(){
    try{
      const response=await axios.post(`${BACKEND_URL}/api/v1/user/signin`,logs);
      const jwt=response.data;
      localStorage.setItem("token",jwt);
      localStorage.setItem("email",logs.email)
      navigate("/blogs/?name="+logs.email);
    }catch(error){
      //@ts-ignore
      const status=error.response.status;
      console.log("Error while Login",error);
      if (axios.isAxiosError(error) && error.response){
        if(status=== 400){
          seterrorMsg("Input Provided is Incorrect");
        }
        else if(status===404){
          seterrorMsg("User Not Found or check password");
        }
        else{
          seterrorMsg("check email or password else signup");
        }
      }
    }
  }
      return (
        <div className="h-screen flex justify-center items-center p-6">
          <div className="max-w-lg w-full space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-center">SignIn to account</h2>
                <p className="mt-2 text-center text-lg text-gray-700 font-semibold">
                  Don't have an account?{" "}
                  <a href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500 underline">
                    Signup
                  </a>
                </p>
              </div>
              <form className="mt-8 space-y-10">
                <div className="rounded-md shadow-sm space-y-4">
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
                        setLogs({
                          ...logs,
                          email:e.target.value
                        })
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
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm "
                      placeholder="Password"
                      onChange={(e)=>{
                        setLogs({
                          ...logs,
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
                    onClick={signinFxn}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Sign In
                  </button>
                </div>
              </form>
            </div>
        </div>
      )
}

export default SigninLeft
