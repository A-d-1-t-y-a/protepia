"use client"

import { useSession } from "next-auth/react";

function Home() {
  const { data: session } = useSession();
  
  const handlePrompt = async () => {
    try {
      const res = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user.id,
          prompt: "aditya",
          tag: "Adityas",
        }),
      });
      console.log("response", res);
    } catch (e) {
      console.log("error while posting", e);
    }
  };
  return (
    <div className="w-full flex flex-col flex-center">
      <h1 className="text-black font-extrabold text-5xl sm:text-6xl">
        Discover & Share
      </h1>
      <h1 className=" font-extrabold text-5xl sm:text-6xl my-2 bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent">
        AI-Powered Prompts
      </h1>
      <p className="max-w-2xl text-center text-lg text-gray-900  sm:text-xl mt-3">
        Promptopia is an open-source AI prompting tool for modern world to
        discover, create and share creative prompts
      </p>

      <button
        type="button"
        className="hover:bg-white text-white bg-black border-black border py-1.5 px-5 hover:text-black transition-all text-sm rounded-full flex items-center justify-center"
        onClick={handlePrompt}
      >
        createPost
      </button>
    </div>
  );
}

export default Home;
