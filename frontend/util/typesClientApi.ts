export interface IGiftqueueSerializer {
  id: string;
  owner: number;
  name: string;
  notes: string | null;
  related_to: string;
  url: string[];
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
