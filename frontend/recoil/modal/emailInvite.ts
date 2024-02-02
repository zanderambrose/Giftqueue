import { atom } from "recoil";

export interface IEmailInviteModal {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const defaultEmailInviteModal = {
    isOpen: false,
    setIsOpen: () => { },
};

export const emailInviteModal = atom<IEmailInviteModal>({
    key: "emailInviteModal",
    default: defaultEmailInviteModal,
});
