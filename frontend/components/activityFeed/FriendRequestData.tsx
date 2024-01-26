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

    console.log('friend request data: ', friendRequestData)

    return (
        <>
            {!friendRequestData || friendRequestData.length < 1 ? (
                <>
                    <div className="flex justify-center items-center">
                        <FontAwesomeIcon className="gqp" size="4x" icon={faEarthAmericas} />
                    </div>
                    <p className="text-center mt-8 italic gqp">No friend requests!</p>
                </>
            ) : (
                <>
                    {friendRequestData &&
                        friendRequestData.length > 0 &&
                        friendRequestData.map((item: any) => {
                            return (
                                <ActivitySidebarFriendRequestCard
                                    firstName={item.requestor.first_name}
                                    lastName={item.requestor.last_name}
                                    timeAgo={item.time_ago}
                                />
                            );
                        })}
                </>
            )}
        </>
    );
};

export default FriendRequestData;
