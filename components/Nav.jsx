"use client"

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, 
  getProviders } from 'next-auth/react';

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders ] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);

    }

    setUpProviders();
  }, [])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image src="/assets/images/logo.svg" alt="Promptopia logo" width={30} height={30} className="object-contain"
        />
        <p className="logo_text"> Promptuj</p>
      </Link>


      {/*DESKTOP NAV */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
            Vytvořit příspěvek
            </Link>

            <button type="button" onClick={signOut} className="outline_btn">
              Odhlásit se
            </button>

            <Link href="/profile">
              <Image 
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              />
            </Link>
          </div>
        ): (
          <>
            {providers &&
            Object.values(providers).map((provider) => (
              <button
              type="button"
              key={provider.name}
              onClick={() => signIn(provider.id)}
              className='black_btn'
              >
                Přihlásit se
              </button>
          ))}
          </>
        )}

      </div>

{/*MOBILE NAV*/}
<div className="sm:hidden flex relative">
{session?.user ? (
  <div className="flex">
              <Image 
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown((prev)=> !prev)}

              />
              {toggleDropdown && (
                <div className="dropdown">
                  <Link 
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                  >
                    Můj Profil
                  </Link>
                  <Link 
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                  >
                    Vytvořit Prompt
                  </Link>
                 <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className='mt-5 w-full black_btn'
                >
                  Odhlásit se
                </button>
                  </div>
              )}
    </div>
): (
  <>
  {providers &&
  Object.values(providers).map((provider) => (
    <button
    type="button"
    key={provider.name}
    onClick={() => signIn(provider.id)}
    className='black_btn'
    >
      Přihlásit se
    </button>
))}
</>
)}
</div>

    </nav>
  )
}

export default Nav
