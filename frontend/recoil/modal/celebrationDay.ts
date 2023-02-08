import { atom } from "recoil";
export interface ICelebrationDayModal {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  uuid?: string;
}
export const defaultCelebrationDayModalState = {
  isOpen: false,
  setIsOpen: () => {},
  uuid: undefined,
};

export const celebrationDayModal = atom<ICelebrationDayModal>({
  key: "celebrationDayModal",
  default: defaultCelebrationDayModalState,
});
