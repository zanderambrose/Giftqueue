import { atom } from "recoil";
import { ICelebrationSerializer } from "../../util/typesClientApi"

export interface ICelebrationDayModal {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    uuid?: string;
    data?: Partial<ICelebrationSerializer>
}
export const defaultCelebrationDayModalState = {
    isOpen: false,
    setIsOpen: () => { },
    uuid: undefined,
};

export const celebrationDayModal = atom<ICelebrationDayModal>({
    key: "celebrationDayModal",
    default: defaultCelebrationDayModalState,
});
