import React from "react";
import { useFriendshipApi } from "../util/clientApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface IFriendRequestCard {
    firstName: string;
    lastName: string;
    timeAgo: string;
    requestId: number
    image?: string;
}

const ActivitySidebarFriendRequestCard = ({
    firstName,
    lastName,
    timeAgo,
    image,
    requestId
}: IFriendRequestCard) => {
    const queryClient = useQueryClient();
    const { rejectFriendrequest, acceptFriendrequest } = useFriendshipApi();
    const acceptRequestMutation = useMutation({
        mutationFn: () => {
            return acceptFriendrequest(String(requestId));
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["myFriendRequests"] });
            queryClient.invalidateQueries({ queryKey: ["myFriends"] });
        },
    });

    const declineRequestMutation = useMutation({
        mutationFn: () => {
            return rejectFriendrequest(String(requestId));
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["myFriendRequests"] });
        },
    });

    const handleAcceptClick = () => {
        acceptRequestMutation.mutate()
    };

    const handleDeclineClick = () => {
        declineRequestMutation.mutate()
    };

    return (
        <div className="w-9/12 mx-auto mb-8">
            <div className="flex flex-row items-center">
                <img
                    src={image ?? "/placeholderFriend.jpg"}
                    width={"48"}
                    height={"48"}
                    alt="profile"
                    className="rounded-2xl"
                />
                <p className="ml-2">
                    {firstName} {lastName}
                </p>
            </div>
            <p className="italic text-sm mt-2">Has sent you a friend request.</p>
            <span className="muted float-right text-sm">{timeAgo}</span>
            <div className="flex items-center justify-around w-full mx-auto mt-6">
                <button onClick={handleAcceptClick} className="friendRequestAcceptBtn mr-4 hover:opacity-80">
                    Accept
                </button>
                <button onClick={handleDeclineClick} className="friendRequestDeclineBtn hover:opacity-70">
                    Decline
                </button>
            </div>
        </div>
    );
};

export default ActivitySidebarFriendRequestCard;
