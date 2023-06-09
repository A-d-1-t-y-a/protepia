"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

function Navbar() {
  const { data: session } = useSession();

  const [provider, setProvider] = useState(null);
  const [dropDown, setDropDown] = useState(false);

  const handleDropDown = () => setDropDown((prev) => !prev);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProvider(res);
    })();
  }, []);

  const renderMobileView = () => (
    <div className="sm:hidden flex relative">
      {session?.user ? (
        <div className="flex">
          <Image
            src={session?.user?.image}
            width={36}
            height={36}
            alt="Failed to load the pic"
            className="rounded-full"
            onClick={handleDropDown}
          />
          {dropDown && (
            <div className="top-full absolute right-0 flex flex-col justify-center bg-white min-w-[200px] p-2 border">
              <Link
                href="/create-prompt"
                className="hover:bg-white text-white bg-black border-black border py-1.5 px-5 hover:text-black transition-all text-sm rounded-full flex items-center justify-center"
                onClick={handleDropDown}
              >
                Create Post
              </Link>

              <Link
                href="/profile"
                className="hover:bg-white text-white bg-black border-black border py-1.5 px-5 hover:text-black transition-all text-sm rounded-full flex items-center justify-center my-2"
                onClick={handleDropDown}
              >
                profile
              </Link>

              <button
                onClick={() => {
                  handleDropDown();
                  signOut();
                }}
                className="hover:bg-black text-black bg-white border-black border py-1.5 px-5 hover:text-white transition-all text-sm rounded-full"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      ) : (
        provider &&
        Object.values(provider).map((prov) => (
          <button
            type="button"
            key={prov.name}
            onClick={() => signIn(prov.id)}
            className="hover:bg-white text-white bg-black border-black border py-1.5 px-5 hover:text-black transition-all text-sm rounded-full"
          >
            sign In
          </button>
        ))
      )}
    </div>
  );

  const renderDesktopView = () => (
    <div className="sm:flex hidden">
      {session?.user ? (
        <div className="flex flex-center gap-3 md:gap-5">
          <Link
            href="/create-prompt"
            className="hover:bg-white text-white bg-black border-black border py-1.5 px-5 hover:text-black transition-all text-sm rounded-full"
          >
            Create Post
          </Link>

          <button
            type="button"
            onClick={signOut}
            className="hover:bg-black text-black bg-white border-black border py-1.5 px-5 hover:text-white transition-all text-sm rounded-full"
          >
            Sign Out
          </button>
          <Link href="/profile">
            <Image
              src={session?.user?.image}
              width={36}
              height={36}
              alt="godessPic"
              className="rounded-full"
            />
          </Link>
        </div>
      ) : (
        provider &&
        Object.values(provider).map((provider) => (
          <button
            type="button"
            key={provider.name}
            onClick={() => signIn(provider.id)}
            className="hover:bg-white text-white bg-black border-black border py-1.5 px-5 hover:text-black transition-all text-sm rounded-full"
          >
            sign In
          </button>
        ))
      )}
    </div>
  );

  return (
    <nav className="w-full flex items-center mb-14 p-5 justify-between">
      <Link className="flex flex-center gap-2" href="/">
        <Image
          src="https://www.lonelyphilosopher.com/wp-content/uploads/2021/02/saraswati.png"
          width={36}
          height={36}
          alt="godessPic"
          className="rounded-full"
        />
        <p className="font-medium text-black text-2xl">Promptopia</p>
      </Link>

      {/* desktop version */}
      {renderDesktopView()}
      {/*mobile Version  */}
      {renderMobileView()}
    </nav>
  );
}

export default Navbar;
