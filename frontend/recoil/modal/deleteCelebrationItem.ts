import { atom } from "recoil";
import { IDeleteItem, defaultDeleteItemState } from "./deleteGiftqueueItem";

export const deleteCelebrationItemModal = atom<IDeleteItem>({
  key: "deleteCelebrationItemModal",
  default: defaultDeleteItemState,
});
