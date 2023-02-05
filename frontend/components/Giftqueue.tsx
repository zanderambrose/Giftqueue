import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import NoItemDefaultCard from "./NoItemDefaultCard";
import { useQuery } from "@tanstack/react-query";
import { useGiftqueueApi } from "../util/clientApi";
import GiftqueueItem from "./GiftqueueItem";
import { useSetRecoilState, useRecoilState } from "recoil";
import { giftqueueItem } from "../recoil/modal/giftqueueItem";

const Giftqueue = () => {
  const setGiftqueueItemModalShow = useSetRecoilState(giftqueueItem);
  const handleAddNewItemClick = () => {
    setGiftqueueItemModalShow((currVal) => {
      return {
        ...currVal,
        isOpen: true,
      };
    });
  };

  const { getGiftqueueItems } = useGiftqueueApi();

  // State for showing users giftqueue or default state
  const { isLoading, error, data } = useQuery({
    queryKey: ["myGiftqueueItems"],
    queryFn: getGiftqueueItems,
  });

  return (
    <>
      {!data ? (
        <NoItemDefaultCard
          icon={faListCheck}
          headingText="No items in your giftqueue"
          subText="Let your friends know the items you wish to have."
        />
      ) : (
        <div className="relative top-10 px-8">
          <div className="celebration-day-header">
            <h1 className="text-lg relative right-2">Related Giftqueue</h1>
            <button
              onClick={() => handleAddNewItemClick()}
              className="btn-add-new rounded relative left-2"
            >
              <FontAwesomeIcon className="relative right-2" icon={faPlus} />
              Add New Item
            </button>
          </div>
          {data?.map((item) => {
            return <GiftqueueItem {...item} />;
          })}
        </div>
      )}
    </>
  );
};

export default Giftqueue;
