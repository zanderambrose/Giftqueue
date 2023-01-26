import React from "react";
import Image from "next/image";

const FriendCard = () => {
  return (
    <div className="friendCard">
      <Image
        src={"/placeholderFriend.jpg"}
        width={"74"}
        height={"74"}
        alt="profile"
        className="rounded-2xl mx-auto"
      />
      <h1>friend card</h1>
    </div>
  );
};

export default FriendCard;
