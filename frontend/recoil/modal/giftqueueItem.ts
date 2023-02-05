import { atom } from "recoil";
export interface IGiftqueueModalItem {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  uuid?: string;
}
export const defaultGiftqueueItemModalState: IGiftqueueModalItem = {
  isOpen: false,
  setIsOpen: () => {},
  uuid: undefined,
};

export const giftqueueItem = atom<IGiftqueueModalItem>({
  key: "giftqueueItem",
  default: defaultGiftqueueItemModalState,
});
