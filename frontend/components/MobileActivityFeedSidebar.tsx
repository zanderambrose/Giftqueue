import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGroup,
  faAngleDown,
  faEarthAmericas,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import ActivitySidebarEventCard from "./ActivitySidebarEventCard";
import ActivitySidebarFriendRequestCard from "./ActivitySidebarFriendRequestCard";
import { useRecoilState } from "recoil";
import { modalActivityFeedSidebar } from "../recoil/modal/modalActivityFeedSidebar";

const ActivityFeedSidebar = () => {
  const [isActivityFeedSidebarOpen, setIsActivityFeedSidebarOpen] =
    useRecoilState(modalActivityFeedSidebar);
  const [activityData, setActivityData] = useState(false);
  return (
    <>
      {isActivityFeedSidebarOpen ? (
        <div
          className={`h-screen min-h-screen overflow-y-scroll bg-white top-0 right-0 absolute z-10 w-10/12`}
        >
          <span
            onClick={() => setIsActivityFeedSidebarOpen(false)}
            className="p-4 z-20 absolute top-4 right-4 text-black block cursor-pointer hover:opacity-80"
          >
            <FontAwesomeIcon
              className="text-black cursor-pointer hover:opacity-80"
              size="2x"
              icon={faX}
            />
          </span>
          <div className="relative top-10 pb-8 border-b-2">
            <div className="flex mx-auto items-center justify-center w-full">
              <FontAwesomeIcon icon={faUserGroup} />
              <p className="ml-2 text-base text-slate-500">Latest Updates</p>
            </div>
            <div className="flex justify-center items-center mt-4">
              <div className="text-black text-sm text-center mr-2">Today</div>
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
          </div>
          <div className="relative top-10 mt-8">
            {activityData ? (
              <>
                <div className="flex justify-center items-center">
                  <FontAwesomeIcon
                    className="gqp"
                    size="4x"
                    icon={faEarthAmericas}
                  />
                </div>
                <p className="text-center mt-8 italic gqp">Nothing new yet!</p>
              </>
            ) : (
              <div>
                <ActivitySidebarFriendRequestCard />
                <ActivitySidebarFriendRequestCard />
                <ActivitySidebarEventCard />
                <ActivitySidebarEventCard />
                <ActivitySidebarEventCard />
                <ActivitySidebarEventCard />
                <ActivitySidebarEventCard />
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ActivityFeedSidebar;
