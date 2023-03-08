import React from "react";
import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <>
      <h1>hello sign in</h1>
      <button
        onClick={() =>
          signIn("google", {
            callbackUrl: process.env.NEXT_PUBLIC_FRONTEND_BASE_URL,
          })
        }
      >
        sign in with google
      </button>
    </>
  );
};

export default Login;
