import {
  faChampagneGlasses,
  faX,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import NoItemDefaultCard from "./NoItemDefaultCard";
import Calendar from "react-calendar";
import DateCard from "./DateCard";
import MyEventCard from "./MyEventCard";

const CelebrationDay = () => {
  // State for showing users days or default state
  const [hasEvents, setHasEvents] = useState<boolean>(false);

  // State for celebration day modal
  const [addFirstDayModal, setAddFirstDayModal] = useState(false);

  // State for Delete Event Modal
  const [deleteEventModal, setDeleteEventModal] = useState(false);

  return (
    <>
      {hasEvents ? (
        <NoItemDefaultCard
          icon={faChampagneGlasses}
          headingText="No celebration days entered yet!"
          subText="Share your lovely moments with your friends!"
          setModalToShow={setAddFirstDayModal}
        />
      ) : (
        <div className="relative top-10 px-8">
          <div className="celebration-day-header">
            <h1 className="text-lg relative right-2">This Week</h1>
            <button
              onClick={() => setAddFirstDayModal(true)}
              className="btn-add-new rounded relative left-2"
            >
              <FontAwesomeIcon className="relative right-2" icon={faPlus} />
              Add New Event
            </button>
          </div>
          {/* TODO - extract this into its own component */}
          <div className="flex flex-row gap-x-4 mt-4">
            <div>
              <DateCard />
            </div>
            <div className="flex-1">
              <MyEventCard />
            </div>
          </div>
          <div className="flex flex-row gap-x-4 mt-4">
            <div>
              <DateCard />
            </div>
            <div className="flex-1">
              <MyEventCard />
            </div>
          </div>
          <div className="flex flex-row gap-x-4 mt-4">
            <div>
              <DateCard />
            </div>
            <div className="flex-1">
              <MyEventCard />
            </div>
          </div>
        </div>
      )}
      {addFirstDayModal ? (
        <>
          <div
            onClick={() => setAddFirstDayModal(false)}
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-5/12 my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5">
                  <h3 className="text-lg font-semibold">Add New Event</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setAddFirstDayModal(false)}
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
                    <input
                      type="text"
                      placeholder="Enter Event Title"
                      className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-md shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "
                    />
                    <label className="block mt-8">
                      <span className="block text-md font-medium">
                        Select Date
                      </span>
                    </label>
                    <Calendar />
                  </form>
                </div>
                {/*footer*/}
                <div className="text-center block p-6">
                  <button
                    className="main-Btn hover:opacity-80"
                    type="button"
                    onClick={() => setAddFirstDayModal(false)}
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
      {deleteEventModal ? (
        <>
          <div
            onClick={() => setDeleteEventModal(false)}
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-5/12 my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <h3 className="mt-6 text-lg font-semibold text-center">
                  Delete Event
                </h3>
                {/*body*/}
                <div className="relative px-6 flex-auto">
                  <p className="muted text-sm my-6 w-10/12 text-center mx-auto">
                    You are about to delete the registered event. Are you sure
                    that you would like to delete it? Note your friend list may
                    see this update!
                  </p>
                  <div className="text-center mb-8">
                    <input
                      type="checkbox"
                      className="text-center mr-2"
                      name="friend-notify"
                      id="friend-notify"
                    />
                    <label htmlFor="friend-notify">
                      Don't notify my friends
                    </label>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex flex-row items-center justify-center mb-6">
                  <button
                    className="deleteModalDeleteBtn mr-2"
                    type="button"
                    onClick={() => setAddFirstDayModal(false)}
                  >
                    Delete
                  </button>
                  <button
                    className="deleteModalCancelBtn ml-2"
                    type="button"
                    onClick={() => setAddFirstDayModal(false)}
                  >
                    Cancel
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

export default CelebrationDay;
