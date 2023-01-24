import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck, faX } from "@fortawesome/free-solid-svg-icons";
import NoItemDefaultCard from "./NoItemDefaultCard";

const Giftqueue = () => {
  // State for showing users giftqueue or default state
  const [hasGifts, setHasGifts] = useState<boolean>(false);

  //State for showing default add item modal
  const [addFirstItemModal, setAddFirstItemModal] = useState(false);

  return (
    <>
      {!hasGifts ? (
        <NoItemDefaultCard
          icon={faListCheck}
          headingText="No items in your giftqueue"
          subText="Let your friends know the items you wish to have."
          setModalToShow={setAddFirstItemModal}
        />
      ) : (
        <h2>you got elements</h2>
      )}
      {addFirstItemModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5">
                  <h3 className="text-2xl font-semibold">
                    Add new item to your Giftqueue
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setAddFirstItemModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      <FontAwesomeIcon icon={faX} />
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative px-6 flex-auto">
                  <p className="text-slate-500 text-lg leading-relaxed">
                    I always felt like I could do anything. That’s the main
                    thing people are controlled by! Thoughts- their perception
                    of themselves! They're slowed down by their perception of
                    themselves. If you're taught you can’t do anything, you
                    won’t do anything. I was taught I could do everything.
                  </p>
                </div>
                {/*footer*/}
                <div className="text-center block p-6">
                  <button
                    className="main-Btn hover:opacity-80"
                    type="button"
                    onClick={() => setAddFirstItemModal(false)}
                  >
                    Confirm
                  </button>
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

export default Giftqueue;
