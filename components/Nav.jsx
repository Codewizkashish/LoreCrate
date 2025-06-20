"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, use } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  // const isUserLoggedIn = true; - before
  // after- // Replace with actual logic to check if user is logged in
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, settoggleDropdown] = useState(false);

  useEffect(() => {
  const setUpProviders = async () => {
    const response = await getProviders();
    setProviders(response); // now this refers to the state setter
  };
  setUpProviders();
}, []);



  return (
    <nav className="w-full flex justify-between items-center px-5 py-3">
      {/* Logo on left */}
      <Link href="/" className="flex items-center">
         <Image
    src="/assets/images/logo-lorecrate.png"
    alt="Logo Icon"
    width={40}
    height={40}
    className="object-contain"
  />
  <Image
    src="/assets/images/logo-name.png"
    alt="Logo Text"
    width={100}
    height={50}
    className="object-contain"
  />
      </Link>

      {/* {alert(providers)} */}

      {/* Dekstop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex items-center gap-4">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>

            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src={ session.user.image}
                alt="Profile"
                width={37}
                height={37}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers && Object.values(providers).map((provider) => (
              <button
                type="button"
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className="black_btn"

              >
                Sign  In
              </button>
            ))}
          </>
        )}
      </div>
      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={ session.user.image }
              alt="Profile"
              width={37}
              height={37}
              className="rounded-full"
              onClick={() => settoggleDropdown((prev) => !prev)}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => settoggleDropdown(false)}>
                    My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => settoggleDropdown(false)}>
                    Create prompt
                </Link>

                <button 
                  type = "button"
                  onClick={() => {
                    settoggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn">
                    Sign Out
                </button>
              </div>
              )}
          </div>
        ) : (
          <>
            {providers && Object.values(providers).map((provider) => (
              <button
                type="button"
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className="black_btn"

              >
                Sign  In
              </button>
            ))}
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav