import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { navigationState, TNavOptions } from "../recoil/navigationState";

export type TFriendDetailNavOptions = "day" | "giftqueue" | "friends";

const FriendDetailPage = () => {
  const [navState, setNavState] = useRecoilState(navigationState);
  const router = useRouter();

  const [friendDetailNavState, setFriendDetailNavState] =
    useState<TFriendDetailNavOptions>("giftqueue");
  const handleNavStateChange = (navItemState: TFriendDetailNavOptions) => {
    setFriendDetailNavState(navItemState);
  };

  const handleBackToFriendsListClick = () => {
    router.push("/");
    setNavState("friends");
  };

  return (
    <>
      <div className="rounded-lg w-11/12 m-auto relative top-10 bg-white">
        <div className="p-20">
          <div
            onClick={() => handleBackToFriendsListClick()}
            className="flex items-center absolute left-4 top-4 cursor-pointer"
          >
            <FontAwesomeIcon size="1x" icon={faArrowLeft} />
            <p className="ml-2 text-sm">Back to Friend list</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center justify-center">
              <p className="gqp">8</p>
              <p>Giftqueue</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Image
                src={"/placeholderFriend.jpg"}
                width={"100"}
                height={"100"}
                alt="profile"
                className="rounded-2xl mx-auto absolute top-4"
              />
              <div className="absolute bottom-8 text-center">
                <p>Zander Ambrose</p>
                <p className="mt-1 muted text-sm">Friends since Feb-2023</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="gqp">180</p>
              <p>Friends</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg w-11/12 mx-auto mt-4 relative top-10 bg-white">
        <div className="flex-1 flex justify-around">
          <h3
            className={
              friendDetailNavState === "giftqueue"
                ? "nav-link nav-link-grow-up"
                : "nav-link"
            }
            onClick={() => handleNavStateChange("giftqueue")}
          >
            Giftqueue
          </h3>
          <h3
            className={
              friendDetailNavState === "day"
                ? "nav-link nav-link-grow-up"
                : "nav-link"
            }
            onClick={() => handleNavStateChange("day")}
          >
            Celebrations
          </h3>
          <h3
            className={
              friendDetailNavState === "friends"
                ? "nav-link nav-link-grow-up"
                : "nav-link"
            }
            onClick={() => handleNavStateChange("friends")}
          >
            Friend List
          </h3>
        </div>
      </div>
    </>
  );
};

export default FriendDetailPage;
