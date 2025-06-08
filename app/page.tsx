"use client"
import Image from "next/image";

import { SignIn, SignInButton, UserButton, useUser } from "@clerk/nextjs";

export default function Home() {
  // const user = useAuthContext();
  // console.log(user?.user)

  const { user } = useUser();

  return (
    <div>
      <header className="  bg-gradient-to-r from-[#BE575F] via-[#A338E3] to-[#AC76D6]
 flex  flex-wrap sm:justify-start  sm:flex-nowrap z-50 w-full bg-white border-b border-gray-200 text-sm py-3 sm:py-0 dark:bg-neutral-800 dark:border-neutral-700">
        <nav className="relative  p-4 max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8" aria-label="Global">
          <div className="flex items-center justify-between">
            <div>
              <Image src={'/logo.png'} alt="logo" width={150} height={150} />
            </div>
          </div>
          <div id="navbar-collapse-with-animation" className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end sm:ps-7 cursor-pointer">

              {/* Clerk Authentication  */}
              {!user ? <SignInButton mode='modal'>
                <div className="flex items-center gap-x-2 font-medium text-gray-500 hover:text-blue-600 sm:border-s sm:border-gray-300 py-2 sm:py-0 sm:ms-4 sm:my-6 sm:ps-6 dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-blue-500" >
                  <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                  </svg>
                  Get Started
                </div>
              </SignInButton>
                :
                <UserButton />
              }
            </div>
          </div>
        </nav>
      </header>


      <div className="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')] dark:before:bg-[url('https://preline.co/assets/svg/examples-dark/polygon-bg-element.svg')] before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-[1] before:transform before:-translate-x-1/2">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">




          <div className="mt-5 max-w-2xl text-center mx-auto">
            <h1 className="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-neutral-200">
              Land Your Dream Job <br />with the {" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#BE575F] via-[#A338E3] to-[#AC76D6]">
                AI Career Coach
              </span>
            </h1>


          </div>


          <div className="mt-5 max-w-3xl text-center mx-auto">
            <p className="text-lg text-gray-600 dark:text-neutral-400">
              Personalized job search, resume tips, mock interviews, and AI guidance for every career level.
            </p>
          </div>


          <div className="mt-8 gap-3 flex justify-center">
            <a className="inline-flex justify-center items-center 
      gap-x-3 text-center bg-gradient-to-r from-[#BE57E6] via-[#A338E6] to-[#AC76E6] hover:from-[#BE575F] hover:via-[#A338E3] hover:to-[#AC76D6] border border-transparent cursor-pointer text-white text-sm font-medium rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600 py-3 px-4 dark:focus:ring-offset-gray-800"
              href="/dashboard">
              Start Coaching
              <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
            </a>

          </div>



        </div>
      </div>





      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">

          <div className="  group flex flex-col justify-center hover:bg-gray-50 rounded-xl p-4 md:p-7 dark:hover:bg-neutral-800" >
            <div className="flex justify-center items-center size-12 bg-blue-600 rounded-xl">


              <Image src="/chatbot.png" alt="Chat Icon" width={24} height={24} />
            </div>
            <div className="mt-5">
              <h3 className="group-hover:text-gray-600 text-lg font-semibold text-gray-800 dark:text-white dark:group-hover:text-gray-400">AI Career Chat Q&A</h3>
              <p className="mt-1 text-gray-600 dark:text-neutral-400">Ask career-related questions and get instant AI guidance on jobs, skills, and trends.</p>

            </div>
          </div>

          <div className="group flex flex-col justify-center hover:bg-gray-50 rounded-xl p-4 md:p-7 dark:hover:bg-neutral-800" >
            <div className="flex justify-center items-center size-12 bg-blue-600 rounded-xl">
              <Image src="/resume.png" alt="Chat Icon" width={24} height={24} />
            </div>
            <div className="mt-5">
              <h3 className="group-hover:text-gray-600 text-lg font-semibold text-gray-800 dark:text-white dark:group-hover:text-gray-400">AI Resume Analyzer</h3>
              <p className="mt-1 text-gray-600 dark:text-neutral-400">Get real-time feedback and improvements for your resume using AI.</p>

            </div>
          </div>

          <div className="group flex flex-col justify-center hover:bg-gray-50 rounded-xl p-4 md:p-7 dark:hover:bg-neutral-800" >
            <div className="flex justify-center items-center size-12 bg-blue-600 rounded-xl">
              <Image src="/roadmap.png" alt="Chat Icon" width={24} height={24} />
            </div>
            <div className="mt-5">
              <h3 className="group-hover:text-gray-600 text-lg font-semibold text-gray-800 dark:text-white dark:group-hover:text-gray-400">AI Roadmap Generator</h3>
              <p className="mt-1 text-gray-600 dark:text-neutral-400">Receive a personalized career roadmap based on your goals and skills.</p>

            </div>
          </div>



        </div>
      </div>




    </div>
  );
}
