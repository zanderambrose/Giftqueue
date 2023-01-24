import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import NoItemDefaultCard from "./NoItemDefaultCard";

const Giftqueue = () => {
  const [hasGifts, setHasGifts] = useState<boolean>(false);
  return (
    <>
      {!hasGifts ? (
        <NoItemDefaultCard
          icon={faListCheck}
          headingText="No items in your giftqueue"
          subText="Let your friends know the items you wish to have."
        />
      ) : (
        <h2>you got elements</h2>
      )}
    </>
  );
};

export default Giftqueue;
