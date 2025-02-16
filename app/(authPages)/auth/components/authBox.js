'use client';

import { useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaEyeSlash, FaRegEye } from "react-icons/fa6";


export default function AuthBox() {
  const loginForm = useRef(null);
  const router = useRouter();
  const[success,setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);


  const [disAbled,setDisbaled] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setDisbaled(true);
    const result = await signIn("credentials", {
      redirect: false,
      username: formData.username,
      password: formData.password,
    });

    if (result.error) {
      setError(result.error);
      setDisbaled(false);
    } else {
      setSuccess(true);
      setDisbaled(false);
      setTimeout(()=>{
        router.push('/tasks');
      },3000);
    }
  };

  return (
    <div className="w-full h-screen flex flex-row justify-center items-center">
      <div className="w-full mx-auto max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h5 className="text-xl font-medium font-bold text-center text-gray-900">
            Hi, Let's Sign In first.
          </h5>
          
          <div>
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">
              Your Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="theme-input rounded-lg"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
              Your password
            </label>
            <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="••••••••"
              className="theme-input rounded-lg pr-10"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-900"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ?<FaEyeSlash />  : <FaRegEye/>  }
            </button>
          </div>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            disabled={disAbled?true:false}
          >
            {!disAbled?'Login to your account':'Please Wait...'}
          </button>
        {success &&
          <div id="alert-3" className="flex items-center p-4 mb-4 text-green-800 rounded-lg bg-green-50 " role="alert">
                <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                <span className="sr-only">Info</span>
                <div className="ms-3 text-sm font-medium">
                Login verified successfully. Redirecting...
                </div>
                <button type="button" onClick={()=>setSuccess(false)} className="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 " data-dismiss-target="#alert-3" aria-label="Close">
                    <span className="sr-only">Close</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                </button>
                </div>
                }

                {error && <div id="alert-2" className="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 " role="alert">
                    <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <span className="sr-only">Info</span>
                    <div className="ms-3 text-sm font-medium">
                    Invalid Credentials
                        
                    </div>
                    <button type="button" onClick={()=>setError(false)}  className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8" data-dismiss-target="#alert-2" aria-label="Close">
                        <span className="sr-only">Close</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                    </div>}
        </form>
      </div>
    </div>
  );
}
