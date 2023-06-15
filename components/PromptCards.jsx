"use client";

import { useState } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

function PromptCards({ cardData, editDeleteOption }) {
  const route = useRouter();

  const [copy, setCopy] = useState("");

  const handleCopyToClipBoard = (prompt, id) => () => {
    navigator.clipboard.writeText(prompt);

    setCopy(id);

    setTimeout(() => {
      setCopy("");
    }, 3000);
  };

  const handleProfileNavigation = (id, name) => () =>
    route.push(`profile?id=${id}&name=${name}`);

  const handleTagNavigation = (tagName) => () =>
    route.push(`?searchTerm=${tagName.replace("#", "")}`);

  const renderCardUI = ({
    creator: { email, image, username, _id: profileId },
    prompt,
    tag,
    _id,
  }) => (
    <div
      className="shadow-md m-2 flex-1 break-inside-avoid rounded-lg border border-gray-300 bg-white/20 bg-clip-padding p-6 pb-4 backdrop-blur-lg backdrop-filter md:w-[360px] w-full h-fit"
      key={_id}
    >
      <div className="flex flex-row items-center w-full">
        <div
          className="flex-1 flex items-center gap-3"
          onClick={handleProfileNavigation(profileId, username)}
        >
          <Image
            src={image}
            alt="unable to load the image"
            className="rounded-full"
            width={36}
            height={36}
          />
          <div>
            <div className="font-medium text-black">{username}</div>
            <div className="text-gray-400">{email}</div>
          </div>
        </div>
        <button
          className="rounded-full p-2 ml-2 bg-red-300"
          onClick={handleCopyToClipBoard(prompt, _id)}
        >
          <Image
            src={
              copy == _id ? "/assets/icons/check.svg" : "/assets/icons/copy.svg"
            }
            width={copy == _id ? 15 : 10}
            height={copy == _id ? 15 : 10}
            alt={copy == _id ? "checkIcon" : "copyIcon"}
          />
        </button>
      </div>

      <p className="my-3">{prompt}</p>
      <button className="text-blue-400" onClick={handleTagNavigation(tag)}>
        #{tag}
      </button>
      {editDeleteOption && (
        <div className="w-full flex items-center gap-5 justify-center">
          <button
            className="capitalize text-green-400 font-medium"
            onClick={editDeleteOption("edit", _id)}
          >
            edit
          </button>
          <button
            className="capitalize text-red-400 font-medium"
            onClick={editDeleteOption("delete", _id)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className=" space-y-6 py-8 sm:columns-2 sm:gap-6 xl:columns-3">
      {cardData.map((item) => renderCardUI(item))}
    </div>
  );
}

export default PromptCards;
