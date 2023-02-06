import React from "react";

const ModalDeleteItem = () => {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
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
                You are about to delete the registered event. Are you sure that
                you would like to delete it? Note your friend list may see this
                update!
              </p>
              <div className="text-center mb-8">
                <input
                  type="checkbox"
                  className="text-center mr-2"
                  name="friend-notify"
                  id="friend-notify"
                />
                <label htmlFor="friend-notify">Don't notify my friends</label>
              </div>
            </div>
            {/*footer*/}
            <div className="flex flex-row items-center justify-center mb-6">
              <button className="deleteModalDeleteBtn mr-2" type="button">
                Delete
              </button>
              <button className="deleteModalCancelBtn ml-2" type="button">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default ModalDeleteItem;
