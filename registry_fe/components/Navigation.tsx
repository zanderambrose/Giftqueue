import React from "react";

// Next Js
import Link from "next/link";
import { useRouter } from "next/router";

// Bootstrap
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

// Next Auth
import { useSession, signOut } from "next-auth/react";

function Navigation() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleSignOut = () => {
    signOut({
      callbackUrl: `http://localhost:3000`,
      // callbackUrl: `${process.env.FRONTEND_BASE_URL}`,
    });
  };

  return (
    <Navbar>
      <Container>
        <Link href="/" passHref>
          <Navbar.Brand>Logo</Navbar.Brand>
        </Link>
        <Navbar.Toggle />
        {router.pathname === "/" && (
          <div className="justify-content-end">
            {session ? (
              <Button
                onClick={() => handleSignOut()}
                className="px-4"
                variant="success"
              >
                Sign Out
              </Button>
            ) : (
              <Link href="/login" passHref>
                <Button className="px-4" variant="success">
                  Login
                </Button>
              </Link>
            )}
          </div>
        )}
      </Container>
    </Navbar>
  );
}

export default Navigation;
