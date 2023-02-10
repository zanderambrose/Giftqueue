// CURRENTLY NOT USING THIS
// UPDATE IF I NEED GLOABAL DETAIL STATE
import { atom } from "recoil";
import { TFriendDetailNavOptions } from "../../components/FriendDetailPage";

export const friendDetailNavigationState = atom<TFriendDetailNavOptions>({
  key: "friendDetailNavigationState",
  default: "giftqueue",
});
