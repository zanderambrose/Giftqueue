import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

interface IFriendCardProps {
  name: string;
  image: string;
  isFriend?: boolean;
}

const FriendCard = ({ name, image, isFriend }: IFriendCardProps) => {
  let placeholderNameForTesting = "zander";
  const router = useRouter();
  // This will be set up as props passed in from data fetch
  const handleFriendDetailPage = () => {
    router.push(`/${placeholderNameForTesting}`);
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
          src={image}
          width={"74"}
          height={"74"}
          alt="profile"
          className="rounded-2xl mx-auto"
          onClick={() => handleFriendDetailPage()}
        />
      </div>
      <h1 className="mt-4 text-lg">{name}</h1>
      {isFriend ? (
        <>
          <p className="text-sm muted">Friends since Feb-2023</p>
          <p className="italic text-sm text-black mt-4">
            Nearest Upcoming event: 11-2-2023
          </p>
          <p>
            (<span className="text-sm gqp px-1 italic">21 days remaining</span>)
          </p>
        </>
      ) : (
        <>
          <p className="text-sm muted">Not a friend yet</p>
          <div className="friendRequestBtn hover:opacity-80">
            <button className="text-white">Send friend request</button>
          </div>
        </>
      )}
    </div>
  );
};

export default FriendCard;
