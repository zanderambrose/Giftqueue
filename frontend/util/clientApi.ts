import axios from "axios";
import { useSession } from "next-auth/react";
import {
  ICelebrationSerializer,
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
          { ...items },
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
    deleteGiftqueueItem: async (itemUuid: string) => {
      try {
        const response = await axios.delete(
          `${process.env.NEXT_PUBLIC_REGISTRY_API_BASE_URL}giftqueue/${itemUuid}/`,
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

export const useCelebrationApi = () => {
  const { data: session } = useSession();
  return {
    getCelebrations: async () => {
      try {
        const response = await axios.get<ICelebrationSerializer[]>(
          `${process.env.NEXT_PUBLIC_REGISTRY_API_BASE_URL}celebration/`,
          {
            headers: { Authorization: `Bearer ${session?.accessToken}` },
          }
        );
        console.log(response);
        return response.data;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    createCelebration: async (items: IGiftqueueItemCreate) => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_REGISTRY_API_BASE_URL}giftqueue/`,
          { ...items },
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
