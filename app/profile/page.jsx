"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import PromptCards from "@components/PromptCards";
import { useRouter, useSearchParams } from "next/navigation";

function MyProfile() {
  const { data: session } = useSession();

  const route = useRouter();

  const params = useSearchParams();
  
  const id = params.get("id"),
    name = params.get("name");

  const [prompts, setPrompts] = useState([]);

  const handleFetchPrompts = async (id) => {
    try {
      const res = await fetch(`api/user/${id}`);
      const data = await res.json();

      setPrompts([...data]);
    } catch (e) {
      console.log("error", e);
    }
  };

  const handleEditOrDelete = (deleteOrEdit, id) => async () => {
    if (deleteOrEdit == "edit") route.push(`/update-prompt?id=${id}`);
    else {
      try {
        const res = await fetch(`api/prompt/${id}`, {
          method: "DELETE",
        });
        if (res.ok) setPrompts((prev) => prev.filter(({ _id }) => _id != id));
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  useEffect(() => {
    if (session?.user.id || id) handleFetchPrompts(id ? id : session?.user.id);
  }, [id]);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="bg-gradient-to-r from-blue-500 to-green-300 text-transparent font-extrabold bg-clip-text text-5xl pb-2">
        {session?.user.id != id && name ? name : "My"} Profile
      </div>
      <p className="my-5 text-slate-500">
        {session?.user.id != id && name
          ? `Welcome to ${name} personalized profile page. Explore ${name} exceptional prompts and be inspired by the power of their imagination`
          : "Welcome to your personalized profile page"}
      </p>
      <PromptCards
        cardData={prompts}
        editDeleteOption={session?.user.id == id ? handleEditOrDelete : null}
      />
    </div>
  );
}

export default MyProfile;
