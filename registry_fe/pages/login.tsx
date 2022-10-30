import React from "react";
import { Button } from "react-bootstrap";
import { signIn } from "next-auth/react";

const login = () => {
  return (
    <Button
      onClick={() =>
        signIn("google", {
          callbackUrl: "http://localhost:3000",
          //   callbackUrl: `${process.env.FRONTEND_BASE_URL as string}`,
        })
      }
    >
      Sign in with google
    </Button>
  );
};

export default login;
