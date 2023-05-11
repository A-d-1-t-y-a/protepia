"use client";
import CreateOrUpdate from "@components/CreateOrUpdatePrompt";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const CreatePageBasedId = () => {
  const id = useSearchParams().get("id");
  const [prompt, setPrompt] = useState({
    prompt: "",
    tag: "",
  });

  const handleFetchPrompt = async () => {
    try {
      const res = await fetch(`api/prompt/${id}`, {
        method: "GET",
      });
      const { prompt, tag } = await res.json();

      setPrompt({ prompt, tag });
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    handleFetchPrompt();
  }, []);

  return (
    <CreateOrUpdate id={id} OldPrompt={prompt.prompt} OldTag={prompt.tag} />
  );
};

export default CreatePageBasedId;
