"use client";

import { useEffect, useState } from "react";

import { useSession } from "next-auth/react";

import { useRouter } from "next/navigation";

import Link from "next/link";

const CreateOrUpdate = ({ id }) => {
  const { data: session } = useSession();

  const route = useRouter();

  const [tag, setTag] = useState("");
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState({
    prompt: "",
    tag: "",
  });

  const handleFetchPrompt = async () => {
    try {
      const res = await fetch(`api/prompt/${id}`, {
        method: "GET",
      });
      const { prompt, tag } = await res.json();

      setPrompt(prompt);

      setTag(tag);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleApiCall = async (url) => {
    try {
      const res = await fetch(url, {
        method: id ? "PATCH" : "POST",
        body: JSON.stringify({
          userId: session?.user.id,
          prompt: prompt,
          tag: tag,
        }),
      });

      if (res.ok) route.push("/");
    } catch (e) {
      console.log("error while posting", e);
    }
  };

  const handlePromptInput = (e) => setPrompt(e.target.value);

  const handleTagInput = (e) => setTag(e.target.value);

  const handleCreateOrUpdatePost = () => {
    if (!prompt && !tag)
      setError({
        prompt: "This field is required *",
        tag: "This field is required *",
      });
    else if (!prompt) setError({ prompt: "This field is required *", tag: "" });
    else if (!tag) setError({ tag: "This field is required *", prompt: "" });
    else {
      if (id) handleApiCall(`/api/prompt/${id}`);
      else handleApiCall("/api/prompt/new");
    }
  };

  useEffect(() => {
    if (id) handleFetchPrompt();
  }, []);

  return (
    <div className="md:ml-10 flex flex-col">
      <p className="bg-gradient-to-r from-blue-500 to-green-300 text-transparent font-extrabold bg-clip-text text-5xl pb-4">
        {id ? "Update" : "Create"} Post
      </p>
      <p className="my-5 text-lg sm:text-xl text-slate-500 text-left max-w-md">
        {id ? "Update" : "Create"} and share amazing prompts with the world and
        let your imagination run wild with any AI-powered platform
      </p>
      <div className="w-full max-w-2xl flex flex-col gap-7 rounded-xl border border-gray-200 bg-white/20 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur p-5">
        <label>
          <span className="font-semibold text-gray-700 text-base mb-3">
            Your AI Prompt
          </span>
          <textarea
            placeholder="write your prompt here.."
            className="w-full min-h-96 p-5 outline-none"
            value={prompt}
            onChange={handlePromptInput}
          />
          {error.prompt && <p className="text-red-600 ml-5">{error.prompt}</p>}
        </label>
        <label>
          <div className="mb-3 mt-6 text-gray-700">
            <span className="font-semibold text-base">Tag </span>
            (#product,#webDevelopment,#idea)
          </div>
          <input
            placeholder="#tag"
            className="py-2 px-5 w-full rounded-md outline-none"
            value={tag}
            onChange={handleTagInput}
          />
          {error.tag && <p className="text-red-600 ml-5">{error.tag}</p>}
        </label>

        <div className="flex flex-row items-center gap-6 mt-4 justify-end">
          <Link
            href="/"
            className="hover:bg-orange-700 text-black font-bold capitalize p-3 rounded-full px-7  hover:text-white"
          >
            Cancel
          </Link>
          <button
            className="bg-orange-700 hover:bg-green-500 font-bold capitalize p-3 rounded-full px-7 text-white"
            onClick={handleCreateOrUpdatePost}
            disabled={error.tag || error.prompt}
          >
            {id ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateOrUpdate;
