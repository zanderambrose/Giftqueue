import React from "react";
import BtnPrimary from "./buttons/BtnPrimary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilState } from "recoil";
import { giftqueueItem } from "../recoil/modal/giftqueueItem";

const NoItemDefaultCard = ({
  icon,
  headingText,
  subText,
}: {
  icon: any;
  headingText: string;
  subText: string;
}) => {
  const [giftqueueItemModalShow, setGiftqueueItemModalShow] =
    useRecoilState(giftqueueItem);

  return (
    <>
      <div className="rounded-lg w-4/5 m-auto relative top-10 bg-white">
        <div className="p-20 text-center">
          <FontAwesomeIcon className="gqp" size="5x" icon={icon} />
          <h1 className="font-black mt-4">{headingText}</h1>
          <p>{subText}</p>
          <BtnPrimary text="Add New Event" />
        </div>
      </div>
    </>
  );
};

export default NoItemDefaultCard;
