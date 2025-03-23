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
    <nav className="py-8 ml-8 mr-8 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Link href="/">
          <h1 className="text-6xl font-semibold text-red-500">fūin</h1>
        </Link>

        <div className="hidden sm:flex items-center gap-6 mt-7">
          <Link
            className="text-lg font-sm hover:text-red-500 transition-colors"
            href="/"
          >
            home
          </Link>
          <Link
            className="text-lg font-sm hover:text-red-500 transition-colors"
            href="/dashboard"
          >
            dashboard
          </Link>
          <Link
            className="text-lg font-sm hover:text-red-500 transition-colors"
            href="/apps"
          >
            apps
          </Link>
          <Link
            className="text-lg font-sm hover:text-red-500 transition-colors"
            href="/about"
          >
            about
          </Link>
        </div>
      </div>

      {user ? (
        <div className="flex items-center gap-4">
          <p>{user.given_name}</p>
          <LogoutLink
            className={buttonVariants({
              variant: "outline",
              className: "hover:text-red-500",
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
              className: "hover:text-red-500",
            })}
          >
            Login
          </LoginLink>
          <RegisterLink
            className={buttonVariants({
              variant: "outline",
              className: "hover:text-red-500",
            })}
          >
            Sign up
          </RegisterLink>
        </div>
      )}
    </nav>
  );
}
