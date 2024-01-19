type GiftItemUrl = {
    id: number;
    url: string
}

export interface IGiftqueueSerializer {
    id: string;
    owner: number;
    name: string;
    notes: string | null;
    related_to: ICelebrationSerializer;
    url: GiftItemUrl[];
}

export interface IGiftqueueItemCreate {
    name: string;
    url?: string | string[];
    notes?: string;
    related_to?: string;
}

export type TGiftqueueDetailSerializer = {
    uuid: string;
} & Partial<IGiftqueueItemCreate>;

export interface ICelebrationSerializer {
    id: string;
    owner: string;
    name: string;
    date: string;
}

export type TCelebrationCreate = Omit<ICelebrationSerializer, "id" | "owner">;

export type TCelebrationDetail = {
    uuid: string;
} & Partial<TCelebrationCreate>;

export interface TUser {
    id: string;
    days_sinced_joined: string;
    email: string;
    first_name: string;
    last_name: string;
    is_superuser: boolean;
}
