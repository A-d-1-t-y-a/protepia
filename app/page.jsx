"use client";

import { useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

import PromptCards from "@components/PromptCards";

function Home() {
  const { data: session } = useSession();

  const searchTermUrl = useSearchParams().get("searchTerm");

  const [searchInput, setSearchInput] = useState(
    searchTermUrl && searchTermUrl.length ? searchTermUrl : ""
  );
  const [searchedItems, setSearchItems] = useState([]);
  const [allItems, setAllItems] = useState([]);

  const handleSearchInput = (e) => setSearchInput(e.target.value);

  const handleGetPosts = async () => {
    try {
      const res = await fetch("/api/prompt", {
        method: "GET",
      });

      const data = await res.json();

      setAllItems([...data]);
    } catch (e) {
      console.log("error while posting", e);
    }
  };

  const handleFetchSearchedTerms = async (searchTerm) => {
    try {
      const res = await fetch(`api/search/${searchTerm}`, {
        method: "GET",
      });

      const data = await res.json();
      setSearchItems([...data]);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSearch = async (e) => {
    if (e.key == "Enter" && searchInput.length)
      handleFetchSearchedTerms(searchInput);
    else if (searchInput.length == 0) setSearchItems([]);
  };

  useEffect(() => {
    if (!allItems.length) handleGetPosts();
    if (searchTermUrl?.length) {
      setSearchInput(searchTermUrl);
      handleFetchSearchedTerms(searchTermUrl);
    }
  }, [session?.user.id, searchTermUrl]);

  return (
    <section className="w-full flex flex-col flex-center">
      <h1 className="text-black font-extrabold leading-[1.15] text-5xl sm:text-6xl  text-center">
        Discover & Share
      </h1>
      <h1 className="font-extrabold text-5xl my-2 bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent text-center">
        AI-Powered Prompts
      </h1>
      <p className="max-w-2xl text-center text-lg text-gray-900 sm:text-xl mt-3">
        Promptopia is an open-source AI prompting tool for modern world to
        discover, create and share creative prompts
      </p>

      <input
        type="text"
        className="my-14 p-2 w-10/12 sm:w-7/12 mx-auto px-6 rounded-md shadow-lg lg:w-6/12 md:5/12 outline-none"
        placeholder="search for a tag or a username"
        onChange={handleSearchInput}
        value={searchInput}
        onKeyDown={handleSearch}
      />

      {searchInput?.length ? (
        <PromptCards cardData={searchedItems} />
      ) : (
        <PromptCards cardData={allItems} />
      )}
    </section>
  );
}

export default Home;
