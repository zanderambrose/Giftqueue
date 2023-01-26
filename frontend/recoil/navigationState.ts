import { atom } from "recoil";

export type TNavOptions = "day" | "giftqueue" | "friends" | "calendar";
export const navigationState = atom<TNavOptions>({
  key: "navigationState",
  default: "day",
});
