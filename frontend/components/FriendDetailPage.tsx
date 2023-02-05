import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faTrashCan,
  faPen,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { navigationState } from "../recoil/navigation/navigationState";
import DateCard from "./DateCard";
import MyEventCard from "./MyEventCard";
import FriendCard from "./FriendCard";

export type TFriendDetailNavOptions = "day" | "giftqueue" | "friends";

const FriendDetailPage = () => {
  const setNavState = useSetRecoilState(navigationState);
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
            Friends
          </h3>
        </div>
      </div>

      <div className="relative top-10 px-8 mt-8">
        {friendDetailNavState === "day" && (
          <>
            <div className="celebration-day-header">
              <h1 className="text-lg relative right-2">This Week</h1>
            </div>
            {/* TODO - extract this into its own component */}
            <div className="flex flex-row gap-x-4 mt-4">
              <div>
                <DateCard />
              </div>
              <div className="flex-1">
                <MyEventCard canEdit={false} />
              </div>
            </div>
            <div className="flex flex-row gap-x-4 mt-4">
              <div>
                <DateCard />
              </div>
              <div className="flex-1">
                <MyEventCard canEdit={false} />
              </div>
            </div>
            <div className="flex flex-row gap-x-4 mt-4">
              <div>
                <DateCard />
              </div>
              <div className="flex-1">
                <MyEventCard canEdit={false} />
              </div>
            </div>
          </>
        )}

        {friendDetailNavState === "giftqueue" && (
          <>
            <div className="celebration-day-header">
              <h1 className="text-lg relative right-2">Related Giftqueue</h1>
            </div>
            {/* TODO - extract this out into its own component */}
            <div className="myGiftqueueCard mt-4">
              <div className="flex flex-row">
                <div className="w-full flex flex-row justify-between items-center">
                  <div>
                    <h3>Item 1 Name</h3>
                    <p>Related to [Event title], [12 days remaining]</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <p className="muted">Where to buy:</p>
                <div className="flex flex-row items-center gap-4">
                  <span>Link 1</span>
                  <span>Link 2</span>
                  <span>Link 3</span>
                  <span>Link 4</span>
                </div>
              </div>
              <div className="mt-4">
                <p className="muted">Notes:</p>
                <p>I need a size XL because I'm a really big boiiiiiii</p>
              </div>
            </div>
          </>
        )}
        {friendDetailNavState === "friends" && (
          <>
            <h1 className="text-lg relative right-2">Friends List</h1>
            <label className="relative block mt-4">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <FontAwesomeIcon
                  className="relative left-1 gqp"
                  size="lg"
                  icon={faSearch}
                />
              </span>
              <input
                className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-10 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-md"
                placeholder="Search for friends"
                type="text"
                name="search"
              />
            </label>
            <p className="mt-4 relative right-2">
              <span className="gqp">212</span> Contacts found in your google
              account!
            </p>
            <div className="mt-4 friendListCardGrid">
              <FriendCard />
              <FriendCard />
              <FriendCard />
              <FriendCard />
              <FriendCard />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default FriendDetailPage;
