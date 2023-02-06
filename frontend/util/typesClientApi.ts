export interface IGiftqueueSerializer {
  id: string;
  name: string;
  notes: string | null;
  owner: number;
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
} & Partial<IGiftqueueSerializer>;
