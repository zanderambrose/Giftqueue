import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGroup,
  faAngleDown,
  faEarthAmericas,
} from "@fortawesome/free-solid-svg-icons";
import ActivitySidebarEventCard from "../ActivitySidebarEventCard";
import ActivitySidebarFriendRequestCard from "../ActivitySidebarFriendRequestCard";

const ActivityFeedData = () => {
  const [activityData, setActivityData] = useState(false);
  const [activityView, setActivityView] = useState<"activity" | "request">(
    "activity"
  );
  return (
    <>
      <div className="relative top-10 pb-8 border-b-2">
        <div className="flex mx-auto items-center justify-center w-full">
          <FontAwesomeIcon icon={faUserGroup} />
          <p className="ml-2 text-base text-slate-500">Latest Updates</p>
        </div>
        <div className="flex justify-center items-center mt-3">
          <div className="text-black text-sm text-center mr-2">Today</div>
          <FontAwesomeIcon icon={faAngleDown} />
        </div>
      </div>
      <div className="flex justify-around items-center relative top-4">
        <div
          onClick={() => setActivityView("activity")}
          className={`text-sm cursor-pointer ${
            activityView === "activity" && "gqp font-bold"
          }`}
        >
          Activity
        </div>
        <div
          onClick={() => setActivityView("request")}
          className={`text-sm cursor-pointer ${
            activityView === "request" && "gqp font-bold"
          }`}
        >
          Friend Requests
        </div>
      </div>
      <div className="relative top-10 mt-8">
        {!activityData ? (
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
    </>
  );
};

export default ActivityFeedData;