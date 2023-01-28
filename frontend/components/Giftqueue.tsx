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
          <div
            onClick={() => setAddFirstItemModal(false)}
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-4/12 my-6 mx-auto max-w-3xl giftQueueModal">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5">
                  <h3 className="text-lg font-semibold">
                    Add a new item to your Giftqueue
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setAddFirstItemModal(false)}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      <FontAwesomeIcon className="text-black" icon={faX} />
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative px-6 flex-auto">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      alert("hello form submit");
                    }}
                  >
                    <label className="block">
                      <span className="block text-md font-medium">
                        Item Name
                      </span>
                      <input
                        type="text"
                        placeholder="Title"
                        className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-md shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "
                      />
                    </label>
                    <label className="block mt-4">
                      <span className="block text-md font-medium">
                        Item Links
                      </span>
                      <input
                        type="text"
                        placeholder="URL"
                        className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-md shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "
                      />
                    </label>
                    <label className="block mt-4">
                      <span className="block text-md font-medium">
                        When do you wish to have this item
                      </span>
                      <input
                        type="text"
                        placeholder="Anytime"
                        className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-md shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "
                      />
                      <input
                        type="text"
                        placeholder="Related to Event"
                        className="mt-4 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-md shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "
                      />
                      <button
                        className="mt-4 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-md shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "
                      >
                        Select Event
                      </button>
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      className="mt-4 block p-2.5 w-full text-md shadow-sm placeholder-slate-400 rounded-lg border border-slate-300 focus:outline-none focus:border-sky-500 focus:ring-1"
                      placeholder="General Notes"
                    ></textarea>
                  </form>
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
