import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import CurrentActivity from "./CurrentActivity";
import FriendRequestData from "./FriendRequestData";
import { useQuery } from "@tanstack/react-query";
import { useFriendshipApi } from "../../util/clientApi";

const ActivityFeedData = () => {
  const [activityView, setActivityView] = useState<"activity" | "request">(
    "activity"
  );
  const { getFriendRequest } = useFriendshipApi();
  const {
    isLoading: friendRequestIsLoading,
    error: friendRequestError,
    data: friendRequestData,
  } = useQuery({
    queryKey: ["myFriendRequests"],
    queryFn: getFriendRequest,
  });
  return (
    <>
      {friendRequestData && friendRequestData.length > 0 && (
        <span
          style={{
            height: "10px",
            width: "10px",
            backgroundColor: "red",
            borderRadius: "50%",
            display: "inline-block",
            position: "absolute",
            right: "38px",
            top: "192px",
          }}
        ></span>
      )}
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
        {activityView === "activity" ? (
          <CurrentActivity />
        ) : (
          <FriendRequestData />
        )}
      </div>
    </>
  );
};

export default ActivityFeedData;
