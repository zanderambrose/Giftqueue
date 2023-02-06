export interface IGiftqueueSerializer {
  id: string;
  name: string;
  notes: string | null;
  owner: number;
  related_to: number;
  url: string[];
}

export type TGiftqueueDetailSerializer = {
  uuid: string;
} & Partial<IGiftqueueSerializer>;
