import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

const FriendCard = () => {
  const router = useRouter();
  // This will be set up as props passed in from data fetch
  let name = "zander";
  const handleFriendDetailPage = () => {
    router.push(`/${name}`);
  };
  return (
    <div className="friendCard relative">
      <FontAwesomeIcon
        className="absolute top-4 right-6"
        size="lg"
        icon={faEllipsisVertical}
      />
      <div className="mt-4">
        <Image
          src={"/placeholderFriend.jpg"}
          width={"74"}
          height={"74"}
          alt="profile"
          className="rounded-2xl mx-auto"
          onClick={() => handleFriendDetailPage()}
        />
      </div>
      <h1 className="mt-4 text-lg">Zander Ambrose</h1>
      <p className="text-sm muted">Friends since Feb-2023</p>
      <p className="italic text-sm text-black mt-4">
        Nearest Upcoming event: 11-2-2023
      </p>
      <p>
        (<span className="text-sm gqp px-1 italic">21 days remaining</span>)
      </p>
    </div>
  );
};

export default FriendCard;
