import React from "react";
import { useActivityFeed } from "../util/clientApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IEventCard {
    firstName: string;
    lastName: string;
    action: "GIFT" | "DAY" | "GIFT_DELETE" | "DAY_DELETE";
    timeAgo: string;
    item: string;
    image?: string;
    activityId: string;
}

const ActivitySidebarEventCard = ({
    firstName,
    lastName,
    action,
    timeAgo,
    item,
    image,
    activityId
}: IEventCard) => {
    const { dismissActivity } = useActivityFeed();
    const queryClient = useQueryClient();

    const actionText = {
        GIFT: "Added new item in their giftqueue!",
        GIFT_DELETE: "Deleted an item from their giftqueue!",
        DAY: "Added new event in their calendar!",
        DAY_DELETE: "Deleted an event from their calendar!"
    }

    const dismissActivityFeedItem = useMutation({
        mutationFn: () => {
            return dismissActivity(activityId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["myActivity"] });
        },
    });

    const handleDismissActivity = () => {
        dismissActivityFeedItem.mutate()
    }

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
                <FontAwesomeIcon
                    className="ml-3 text-red-500 cursor-pointer hover:opacity-80"
                    icon={faX}
                    onClick={handleDismissActivity}
                />
            </div>
            <p className="italic text-sm mt-2">{actionText[action]}</p>
            <p className="italic text-sm">"{item}"</p>
            <span className="muted float-right text-sm">{timeAgo}</span>
        </div>
    );
};

export default ActivitySidebarEventCard;
