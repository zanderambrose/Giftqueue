import { atom } from "recoil";

export const modalProfileSidebar = atom<boolean>({
  key: "modalProfileSidebar",
  default: false,
});
