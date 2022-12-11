import React from "react";

// Next Js
import Link from "next/link";

// Bootstrap
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

// Next Auth
import { useSession, signIn } from "next-auth/react";
import ProfileDropdown from "./ProfileDropdown";

function Navigation() {
  const { data: session } = useSession();

  const handleSignIn = () => {
    signIn("google", {
      callbackUrl: `${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}`,
    });
  };

  return (
    <div className="container ">
      <Navbar className="d-flex justify-content-between align-items-center">
        <Link href="/" passHref>
          <Navbar.Brand>Logo</Navbar.Brand>
        </Link>
        <div className="justify-content-end">
          {session ? (
            <ProfileDropdown />
          ) : (
            <Button
              onClick={() => handleSignIn()}
              className="px-4"
              variant="success"
            >
              Login
            </Button>
          )}
        </div>
      </Navbar>
    </div>
  );
}

export default Navigation;
