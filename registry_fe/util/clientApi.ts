import axios from "axios";
import { useSession } from "next-auth/react";

export const useRegistryApi = () => {
  const { data: session } = useSession();
  const getAuthHeader = () => {
    return `Bearer ${session?.idToken}`;
  };
  return {
    getAllFriends: async () => {
      await axios.get(`${process.env.REGISTRY_API_BASE_URL}friends/`, {
        headers: { Authorization: getAuthHeader() },
      });
    },
  };
};
