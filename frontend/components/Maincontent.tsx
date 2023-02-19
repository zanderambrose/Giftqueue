import React from "react";
import { useRecoilValue } from "recoil";
import { navigationState } from "../recoil/navigation/navigationState";
import Calendar from "./Calendar";
import CelebrationDay from "./CelebrationDay";
import Friends from "./Friends";
import FriendDetailPage from "./FriendDetailPage";
import Giftqueue from "./Giftqueue";
import { useRouter } from "next/router";
import ModalGiftqueueItem from "./modals/ModalGiftqueueItem";
import ModalDeleteGiftqueueItem from "./modals/ModalDeleteGiftqueueItem";
import ModalDeleteCelebrationItem from "./modals/ModalDeleteCelebrationItem";
import { ModalCelebrationDay } from "./modals/ModalCelebrationDay";

const Maincontent = () => {
  const navState = useRecoilValue(navigationState);
  const router = useRouter();
  return (
    <>
      <main className="main-content-min main-content-bg">
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
      {/* Modals */}
      <ModalGiftqueueItem />
      <ModalCelebrationDay />
      <ModalDeleteGiftqueueItem />
      <ModalDeleteCelebrationItem />
    </>
  );
};

export default Maincontent;
