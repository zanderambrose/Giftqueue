import React from "react";
import { Button } from "react-bootstrap";
import { signIn } from "next-auth/react";

const login = () => {
  return (
    <Button
      onClick={() =>
        signIn("google", {
          callbackUrl: `${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}`,
        })
      }
    >
      Sign in with google
    </Button>
  );
};

export default login;
