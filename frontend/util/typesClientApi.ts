export interface IGiftqueueSerializer {
  id: number;
  name: string;
  notes: string | null;
  owner: number;
  related_to: number;
  url: string[];
}
