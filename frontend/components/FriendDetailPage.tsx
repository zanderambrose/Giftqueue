import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const FriendDetailPage = () => {
  return (
    <>
      <div className="rounded-lg w-4/5 m-auto relative top-10 bg-white">
        <div className="p-20">
          <div className="flex items-center absolute left-4 top-4 cursor-pointer">
            <FontAwesomeIcon size="1x" icon={faArrowLeft} />
            <p className="ml-2 text-sm">Back to Friend list</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center justify-center">
              <p className="gqp">8</p>
              <p>Giftqueue</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Image
                src={"/placeholderFriend.jpg"}
                width={"100"}
                height={"100"}
                alt="profile"
                className="rounded-2xl mx-auto absolute top-4"
              />
              <div className="absolute bottom-8 text-center">
                <p>Zander Ambrose</p>
                <p className="mt-1 muted text-sm">Friends since Feb-2023</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="gqp">180</p>
              <p>Friends</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendDetailPage;
