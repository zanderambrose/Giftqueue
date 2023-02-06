import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  giftqueueItem,
  defaultGiftqueueItemModalState,
} from "../../recoil/modal/giftqueueItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGiftqueueApi } from "../../util/clientApi";
import {
  IGiftqueueItemCreate,
  TGiftqueueDetailSerializer,
} from "../../util/typesClientApi";
import { useForm, SubmitHandler } from "react-hook-form";

type ModalGiftqueueItemInputs = {
  name: string;
  link: string | string[];
  notes: string;
  relatedTo: string;
};

const ModalGiftqueueItem = () => {
  // REACT HOOK FORMS
  const {
    register,
    handleSubmit,
    watch,
    reset,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<ModalGiftqueueItemInputs>();

  const queryClient = useQueryClient();
  const { editGiftqueueItem, createGiftqueueItem } = useGiftqueueApi();
  const [giftqueueItemModalShow, setGiftqueueItemModalShow] =
    useRecoilState(giftqueueItem);

  const patchMutation = useMutation({
    mutationFn: (items: TGiftqueueDetailSerializer) => {
      return editGiftqueueItem(items);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["myGiftqueueItems"] });
    },
  });
  const createMutation = useMutation({
    mutationFn: (items: IGiftqueueItemCreate) => {
      return createGiftqueueItem(items);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["myGiftqueueItems"] });
    },
  });

  const handleModalRequest: SubmitHandler<ModalGiftqueueItemInputs> = async (
    data
  ) => {
    console.log("data from form: ", data);
    // If there is a uuid, we are PATCHING an item
    if (giftqueueItemModalShow.uuid) {
      patchMutation.mutate({
        uuid: giftqueueItemModalShow.uuid,
        name: data.name,
      });
    } else {
      // We are creating an item since we do not have uuid
      createMutation.mutate({
        name: data.name,
        url: data.link,
        notes: data.notes,
        related_to: data.relatedTo,
      });
    }
    handleModalReset();
  };

  // Reset on component unmount
  useEffect(() => {
    return () => handleModalReset();
  }, []);
  const handleModalReset = () => {
    reset();
    clearErrors();
    setGiftqueueItemModalShow(defaultGiftqueueItemModalState);
  };

  return (
    <>
      {giftqueueItemModalShow.isOpen ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-4/12 my-6 mx-auto max-w-3xl giftQueueModal">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5">
                  <h3 className="text-lg font-semibold">
                    Add a new item to your Giftqueue
                  </h3>
                  <button
                    onClick={handleModalReset}
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      <FontAwesomeIcon className="text-black" icon={faX} />
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative px-6 flex-auto">
                  <form onSubmit={handleSubmit(handleModalRequest)}>
                    <label className="block">
                      <span className="block text-md font-medium">
                        Item Name
                      </span>
                      <input
                        disabled={isSubmitting}
                        {...register("name")}
                        type="text"
                        placeholder="Title"
                        className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-md shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                      />
                      {errors.name && (
                        <span className="mt-2 text-red-600">
                          {errors.name.message}
                        </span>
                      )}
                    </label>
                    <label className="block mt-4">
                      <span className="block text-md font-medium">
                        Item Links
                      </span>
                      <input
                        disabled={isSubmitting}
                        {...register("link")}
                        type="text"
                        placeholder="URL"
                        className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-md shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                      />
                    </label>
                    <label className="block mt-4">
                      <span className="block text-md font-medium">
                        When do you wish to have this item
                      </span>
                      <input
                        disabled={isSubmitting}
                        {...register("relatedTo")}
                        type="text"
                        placeholder="Anytime"
                        className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-md shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                      />
                      <input
                        disabled={isSubmitting}
                        type="text"
                        placeholder="Related to Event"
                        className="mt-4 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-md shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                      />
                      <button
                        className="mt-4 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-md shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                      >
                        Select Event
                      </button>
                    </label>
                    <textarea
                      disabled={isSubmitting}
                      {...register("notes")}
                      id="message"
                      rows={3}
                      className="mt-4 block p-2.5 w-full text-md shadow-sm placeholder-slate-400 rounded-lg border border-slate-300 focus:outline-none focus:border-sky-500 focus:ring-1"
                      placeholder="General Notes"
                    ></textarea>
                    <div className="text-center block p-6">
                      <button
                        disabled={isSubmitting}
                        className="main-Btn hover:opacity-80"
                        type="submit"
                      >
                        Confirm
                      </button>
                    </div>
                  </form>
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

export default ModalGiftqueueItem;
