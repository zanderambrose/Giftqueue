import { atom } from "recoil";

export interface IDeleteItem {
  uuid: string | undefined;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const defaultDeleteItemState = {
  uuid: undefined,
  isOpen: false,
  setIsOpen: () => {},
};

export const deleteGiftqueueItemModal = atom<IDeleteItem>({
  key: "deleteGiftqueueItemModal",
  default: defaultDeleteItemState,
});
