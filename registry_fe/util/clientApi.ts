import axios from "axios";
import { useSession } from "next-auth/react";

export const useRegistryApi = () => {
  const { data: session } = useSession();
  return {
    getAllFriends: async (): Promise<any[]> => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_REGISTRY_API_BASE_URL}friends/`,
          {
            headers: { Authorization: `Bearer ${session?.idToken}` },
          }
        );
        return response.data;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    createDate: async (name: string, date: any): Promise<any> => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_REGISTRY_API_BASE_URL}celebration/`,
          { name, date },
          { headers: { Authorization: `Bearer ${session?.idToken}` } }
        );
        return response.data;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  };
};
