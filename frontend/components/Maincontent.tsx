import React from "react";
import { useRecoilValue } from "recoil";
import { navigationState } from "../recoil/navigationState";
import Calendar from "./Calendar";
import CelebrationDay from "./CelebrationDay";
import Friends from "./Friends";
import FriendDetailPage from "./FriendDetailPage";
import Giftqueue from "./Giftqueue";
import { useRouter } from "next/router";

const Maincontent = () => {
  const navState = useRecoilValue(navigationState);
  const router = useRouter();
  return (
    <main className="min-height-content main-content-bg">
      <div className="main-content-inner-container">
        {router.pathname == "/" ? (
          <>
            {navState === "day" && <CelebrationDay />}
            {navState === "giftqueue" && <Giftqueue />}
            {navState === "friends" && <Friends />}
            {navState === "calendar" && <Calendar />}
          </>
        ) : (
          <FriendDetailPage />
        )}
      </div>
    </main>
  );
};

export default Maincontent;
