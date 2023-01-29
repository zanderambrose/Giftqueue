import React from "react";
import Image from "next/image";

const ActivitySidebarEventCard = () => {
  return (
    <div className="w-9/12 mx-auto">
      <div className="flex flex-row items-center">
        <Image
          src={"/placeholderFriend.jpg"}
          width={"48"}
          height={"48"}
          alt="profile"
          className="rounded-2xl"
        />
        <p className="ml-2">Zander Ambrose</p>
      </div>
      <p className="italic text-sm mt-2">Added new event in their calendar!</p>
      <p className="italic text-sm">"My Birthday"</p>
      <span className="muted float-right text-sm">12 min ago</span>
    </div>
  );
};

export default ActivitySidebarEventCard;
