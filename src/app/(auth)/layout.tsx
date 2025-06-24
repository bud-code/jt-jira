"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const pathname = usePathname();
  const isSignUp = pathname.includes("sign-up");

  return (
    <div className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex justify-between items-center">
          <Image src="/logo.svg" alt="logo" width={100} height={50} />
          <Link href={isSignUp ? "/sign-in" : "/sign-up"}>
            <Button variant="secondary">
              {isSignUp ? "Sign In" : "Sign Up"}
            </Button>
          </Link>
        </nav>
        <div className="flex flex-col items-center pt-4 md:pt-14">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
