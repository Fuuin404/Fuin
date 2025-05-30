"use client";

import Link from "next/link";
import { buttonVariants } from "../ui/button";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export function Navbar() {
  const { getUser } = useKindeBrowserClient();
  const user = getUser();

  return (
    <nav className="py-4 ml-8 mr-8 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Link href="/">
          <h1
            className="text-7xl font-press-start-2p font-light text-red-500 hover:text-black transition-colors"
            // style={{ letterSpacing: "-0.3em" }}
          >
            Ū {/* Φ θ Θ ∅⍬◯ʘϑΘθ𝜃𝛉𝜗ɵʊ+ × ᚨ 封印 ⭕㊙ Φ🔴*/}
          </h1>
        </Link>

        <div className="hidden sm:flex items-center gap-6 mt-7">
          <Link
            className="text-lg font-mono hover:text-red-500 transition-colors"
            href="/"
          >
            home
          </Link>
          <Link
            className="text-lg font-mono hover:text-red-500 transition-colors"
            href="/dashboard"
          >
            dashboard
          </Link>
          <Link
            className="text-lg font-mono hover:text-red-500 transition-colors"
            href="/settings"
          >
            settings
          </Link>
          <Link
            className="text-lg font-mono hover:text-red-500 transition-colors"
            href="/about"
          >
            about
          </Link>
        </div>
      </div>

      {user ? (
        <div className="flex items-center font-mono gap-4">
          <p>{user.given_name}</p>
          <LogoutLink
            className={buttonVariants({
              variant: "outline",
              className:
                "text-red-500 hover:text-black font-mono border-1 border-black",
            })}
          >
            Logout
          </LogoutLink>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <LoginLink
            className={buttonVariants({
              variant: "outline",
              className: "hover:text-red-500 font-mono border-1 border-black",
            })}
          >
            Login
          </LoginLink>
          <RegisterLink
            className={buttonVariants({
              variant: "outline",
              className: "hover:text-red-500 font-mono border-1 border-black",
            })}
          >
            Sign up
          </RegisterLink>
        </div>
      )}
    </nav>
  );
}
