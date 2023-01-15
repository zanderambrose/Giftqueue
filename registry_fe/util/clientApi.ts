import axios from "axios";
import { useSession } from "next-auth/react";

export const useRegistryApi = () => {
  const { data: session } = useSession();
  return {
    getAllFriends: async (): Promise<any[]> => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_REGISTRY_API_BASE_URL}friend/`,
          {
            headers: { Authorization: `Bearer ${session?.accessToken}` },
          }
        );
        return response.data;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    getMyWishListItems: async (): Promise<any[]> => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_REGISTRY_API_BASE_URL}wishlist/`,
          {
            headers: { Authorization: `Bearer ${session?.accessToken}` },
          }
        );
        return response.data;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    createDate: async (name: string, date: any): Promise<any> => {
      try {
        return axios.post(
          `${process.env.NEXT_PUBLIC_REGISTRY_API_BASE_URL}celebration/`,
          { name, date },
          { headers: { Authorization: `Bearer ${session?.accessToken}` } }
        );
        // return response.data;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    createWishListItem: async (name: string, url: string): Promise<any> => {
      try {
        return axios.post(
          `${process.env.NEXT_PUBLIC_REGISTRY_API_BASE_URL}wishlist/`,
          { name, url },
          { headers: { Authorization: `Bearer ${session?.accessToken}` } }
        );
        // return response.data;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  };
};
