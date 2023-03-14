import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useFriendshipApi } from "../../util/clientApi";
import { faEarthAmericas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ActivitySidebarFriendRequestCard from "../ActivitySidebarFriendRequestCard";

const FriendRequestData = () => {
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
      {!friendRequestData ? (
        <>
          <div className="flex justify-center items-center">
            <FontAwesomeIcon className="gqp" size="4x" icon={faEarthAmericas} />
          </div>
          <p className="text-center mt-8 italic gqp">No friend requests!</p>
        </>
      ) : (
        <>
          <ActivitySidebarFriendRequestCard />
        </>
      )}
    </>
  );
};

export default FriendRequestData;
