import axios from "axios";
import { useSession } from "next-auth/react";
import {
    TCelebrationCreate,
    ICelebrationSerializer,
    IGiftqueueItemCreate,
    IGiftqueueSerializer,
    TGiftqueueDetailSerializer,
    TCelebrationDetail,
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
        deleteGiftqueueItem: async (itemUuid: string, notify: boolean = true) => {
            let notifyParam = notify ? 1 : 0
            try {
                const response = await axios.delete(
                    `${process.env.NEXT_PUBLIC_REGISTRY_API_BASE_URL}giftqueue/${itemUuid}/delete/?notify=${notifyParam}`,
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

export const useGiftItemUrlApi = () => {
    const { data: session } = useSession();
    return {
        deleteGiftItemUrl: async (urlUuid: string) => {
            try {
                const response = await axios.delete(
                    `${process.env.NEXT_PUBLIC_REGISTRY_API_BASE_URL}gift-item-url/${urlUuid}/`,
                    {
                        headers: { Authorization: `Bearer ${session?.accessToken}` },
                    }
                );
                return response.data;
            } catch (error: any) {
                throw new Error(error.message);
            }
        },
    }

}

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
                return response.data;
            } catch (error: any) {
                throw new Error(error.message);
            }
        },
        createCelebration: async (items: TCelebrationCreate) => {
            try {
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_REGISTRY_API_BASE_URL}celebration/`,
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
        editCelebrationItem: async (items: TCelebrationDetail) => {
            try {
                const response = await axios.patch(
                    `${process.env.NEXT_PUBLIC_REGISTRY_API_BASE_URL}celebration/${items.uuid}/`,
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
        deleteCelebrationItem: async (itemUuid: string) => {
            try {
                const response = await axios.delete(
                    `${process.env.NEXT_PUBLIC_REGISTRY_API_BASE_URL}celebration/${itemUuid}/`,
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

export const usePeopleApi = () => {
    const { data: session } = useSession();
    return {
        getUserBySub: async (sub: string) => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_REGISTRY_API_BASE_URL}user/sub/${sub}/`,
                    {
                        headers: {
                            Authorization: `Bearer ${session?.accessToken}`,
                        },
                    }
                );
                return response;
            } catch (error) {
                console.log(error);
                return;
            }
        },
    };
};

export const useFriendshipApi = () => {
    const { data: session } = useSession();
    return {
        sendFriendRequest: async (requestee: string) => {
            try {
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_REGISTRY_API_BASE_URL}friendrequest/`,
                    {
                        requestee,
                        status: "PENDING",
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${session?.accessToken}`,
                        },
                    }
                );
                return response;
            } catch (error) {
                console.log(error);
                return;
            }
        },
        getFriendRequest: async () => {
            try {
                // TODO - type returned serialzed friend request data
                const response = await axios.get<any[]>(
                    `${process.env.NEXT_PUBLIC_REGISTRY_API_BASE_URL}friendrequest/`,
                    {
                        headers: {
                            Authorization: `Bearer ${session?.accessToken}`,
                        },
                    }
                );
                console.log("FRIEND REQUEST: ", response);
                return response.data;
            } catch (error) {
                console.log(error);
                return;
            }
        },
        acceptFriendrequest: async (uuid: string) => {
            try {
                const response = await axios.patch(
                    `${process.env.NEXT_PUBLIC_REGISTRY_API_BASE_URL}friendrequest/${uuid}/`,
                    { status: "ACCEPTED" },
                    {
                        headers: {
                            Authorization: `Bearer ${session?.accessToken}`,
                        },
                    }
                );
                return response;
            } catch (error) {
                console.log("error from getFriendrequest: ", error);
            }
        },
        rejectFriendrequest: async (uuid: string) => {
            try {
                const response = await axios.patch(
                    `${process.env.NEXT_PUBLIC_REGISTRY_API_BASE_URL}friendrequest/${uuid}/`,
                    { status: "REJECTED" },
                    {
                        headers: {
                            Authorization: `Bearer ${session?.accessToken}`,
                        },
                    }
                );
                return response;
            } catch (error) {
                console.log("error from getFriendrequest: ", error);
            }
        },
    };
};

export const useActivityFeed = () => {
    const { data: session } = useSession();
    return {
        getActivity: async () => {
            try {
                // TODO - type return activity serialized data
                const response = await axios.get<any[]>(
                    `${process.env.NEXT_PUBLIC_REGISTRY_API_BASE_URL}activityfeed/`,
                    {
                        headers: {
                            Authorization: `Bearer ${session?.accessToken}`,
                        },
                    }
                );
                console.log(response);
                return response.data;
            } catch (error) {
                console.log(error);
                return;
            }
        },
    };
};
