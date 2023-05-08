import React from "react";

function Home() {
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
    </div>
  );
}

export default Home;
