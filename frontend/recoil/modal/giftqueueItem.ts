import { atom } from "recoil";
import { IGiftqueueSerializer } from "../../util/typesClientApi"

export interface IGiftqueueModalItem {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    uuid?: string;
    data?: Partial<IGiftqueueSerializer>
}
export const defaultGiftqueueItemModalState: IGiftqueueModalItem = {
    isOpen: false,
    setIsOpen: () => { },
    uuid: undefined,
};

export const giftqueueItem = atom<IGiftqueueModalItem>({
    key: "giftqueueItem",
    default: defaultGiftqueueItemModalState,
});
