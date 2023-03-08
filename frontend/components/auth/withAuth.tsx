import React from "react";

// Next Auth
import { useSession } from "next-auth/react";

const useWithAuth = (Component: React.FC) => {
  //   const router = useRouter();
  return () => {
    const { data: session } = useSession({
      required: true,
      onUnauthenticated() {
        window.location.href = "/login";
      },
    });

    // User is logged in
    if (session) {
      return <Component />;
    }

    return null;
  };
};

export default useWithAuth;
