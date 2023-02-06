import axios from "axios";
import { useSession } from "next-auth/react";
import {
  IGiftqueueItemCreate,
  IGiftqueueSerializer,
  TGiftqueueDetailSerializer,
} from "./typesClientApi";

export const useGiftqueueApi = () => {
  const { data: session } = useSession();
  return {
    getGiftqueueItems: async () => {
      try {
        const response = await axios.get<IGiftqueueSerializer[]>(
          `${process.env.NEXT_PUBLIC_REGISTRY_API_BASE_URL}giftqueue/`,
          {
            headers: { Authorization: `Bearer ${session?.accessToken}` },
          }
        );
        return response.data;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    createGiftqueueItem: async (items: IGiftqueueItemCreate) => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_REGISTRY_API_BASE_URL}giftqueue/`,
          { name: items.name },
          {
            headers: { Authorization: `Bearer ${session?.accessToken}` },
          }
        );
        return response.data;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    editGiftqueueItem: async (items: TGiftqueueDetailSerializer) => {
      try {
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_REGISTRY_API_BASE_URL}giftqueue/${items.uuid}/`,
          { name: items.name },
          {
            headers: { Authorization: `Bearer ${session?.accessToken}` },
          }
        );
        return response.data;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  };
};

// export const useRegistryApi = () => {
//   const { data: session } = useSession();
//   return {
//     getAllFriends: async (): Promise<any[]> => {
//       try {
//         const response = await axios.get(
//           `${process.env.NEXT_PUBLIC_REGISTRY_API_BASE_URL}friend/search`,
//           {
//             headers: { Authorization: `Bearer ${session?.accessToken}` },
//           }
//         );
//         return response.data;
//       } catch (error: any) {
//         throw new Error(error.message);
//       }
//     },
//     getMyWishListItems: async (): Promise<any[]> => {
//       try {
//         const response = await axios.get(
//           `${process.env.NEXT_PUBLIC_REGISTRY_API_BASE_URL}wishlist/`,
//           {
//             headers: { Authorization: `Bearer ${session?.accessToken}` },
//           }
//         );
//         return response.data;
//       } catch (error: any) {
//         throw new Error(error.message);
//       }
//     },
//     createDate: async (name: string, date: any): Promise<any> => {
//       try {
//         return axios.post(
//           `${process.env.NEXT_PUBLIC_REGISTRY_API_BASE_URL}celebration/`,
//           { name, date },
//           { headers: { Authorization: `Bearer ${session?.accessToken}` } }
//         );
//         // return response.data;
//       } catch (error: any) {
//         throw new Error(error.message);
//       }
//     },
//     createWishListItem: async (name: string, url: string): Promise<any> => {
//       try {
//         return axios.post(
//           `${process.env.NEXT_PUBLIC_REGISTRY_API_BASE_URL}wishlist/`,
//           { name, url },
//           { headers: { Authorization: `Bearer ${session?.accessToken}` } }
//         );
//         // return response.data;
//       } catch (error: any) {
//         throw new Error(error.message);
//       }
//     },
//   };
// };
