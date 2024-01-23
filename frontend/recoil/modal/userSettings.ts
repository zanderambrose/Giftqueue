import { atom } from "recoil";

export interface IUserSettingsModal {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const defaultUserSettingsModalState = {
    isOpen: false,
    setIsOpen: () => { },
};

export const userSettingsModal = atom<IUserSettingsModal>({
    key: "userSettingsModal",
    default: defaultUserSettingsModalState,
});
