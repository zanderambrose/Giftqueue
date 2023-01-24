import React from "react";
import BtnPrimary from "./buttons/BtnPrimary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NoItemDefaultCard = ({
  icon,
  headingText,
  subText,
}: {
  icon: any;
  headingText: string;
  subText: string;
}) => {
  return (
    <div className="rounded-lg w-4/5 m-auto relative top-10 bg-white">
      <div className="p-20 text-center">
        <FontAwesomeIcon style={{ color: "#aa96da" }} size="5x" icon={icon} />
        <h1 className="font-black mt-4">{headingText}</h1>
        <p>{subText}</p>
        <BtnPrimary text="Add New Event" />
      </div>
    </div>
  );
};

export default NoItemDefaultCard;
