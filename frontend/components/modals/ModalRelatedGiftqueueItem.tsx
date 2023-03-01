import React, { useState } from "react";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IGiftqueueSerializer } from "../../util/typesClientApi";
import GiftqueueItem from "../GiftqueueItem";

interface IRelatedGqProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  giftqueueItemData: IGiftqueueSerializer[];
  name: string;
}

export const ModalRelatedGiftqueueItem = ({
  isOpen,
  setIsOpen,
  giftqueueItemData,
  name,
}: IRelatedGqProps) => {
  return (
    <>
      {isOpen ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-11/12 md:w-10/12 lg:w-8/12 xl:w-6/12 my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5">
                  <div className="flex flex-col">
                    <h3 className="text-lg font-semibold">{name} Giftqueue</h3>
                    <p>
                      {giftqueueItemData.length}{" "}
                      {giftqueueItemData.length > 1 ? "items" : "item"}
                      &nbsp;added to my giftqueue
                    </p>
                  </div>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      <FontAwesomeIcon className="text-black" icon={faX} />
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative px-6 pb-8 flex-auto">
                  <p>
                    {giftqueueItemData.map((item) => {
                      return <GiftqueueItem key={item.id} {...item} />;
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};
