import React from "react";
import Image from "next/image";

interface IFriendRequestCard {
  firstName: string;
  lastName: string;
  timeAgo: string;
  image?: string;
}

const ActivitySidebarFriendRequestCard = ({
  firstName,
  lastName,
  timeAgo,
  image,
}: IFriendRequestCard) => {
  return (
    <div className="w-9/12 mx-auto mb-8">
      <div className="flex flex-row items-center">
        <Image
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
        <button className="friendRequestAcceptBtn mr-4 hover:opacity-80">
          Accept
        </button>
        <button className="friendRequestDeclineBtn hover:opacity-70">
          Decline
        </button>
      </div>
    </div>
  );
};

export default ActivitySidebarFriendRequestCard;
