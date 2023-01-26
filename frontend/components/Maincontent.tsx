import React from "react";
import { useRecoilValue } from "recoil";
import { navigationState } from "../recoil/navigationState";
import Calendar from "./Calendar";
import CelebrationDay from "./CelebrationDay";
import Friends from "./Friends";
import Giftqueue from "./Giftqueue";

const Maincontent = () => {
  const navState = useRecoilValue(navigationState);
  return (
    <main className="min-height-content main-content-bg">
      {navState === "day" && <CelebrationDay />}
      {navState === "giftqueue" && <Giftqueue />}
      {navState === "friends" && <Friends />}
      {navState === "calendar" && <Calendar />}
    </main>
  );
};

export default Maincontent;
