import React from "react";
import Image from "next/image";

interface IEventCard {
  firstName: string;
  lastName: string;
  action: "GIFT" | "CELEBRATION";
  timeAgo: string;
  item: string;
  image?: string;
}

const ActivitySidebarEventCard = ({
  firstName,
  lastName,
  action,
  timeAgo,
  item,
  image,
}: IEventCard) => {
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
      <p className="italic text-sm mt-2">Added new event in their calendar!</p>
      <p className="italic text-sm">"{item}"</p>
      <span className="muted float-right text-sm">{timeAgo}</span>
    </div>
  );
};

export default ActivitySidebarEventCard;
