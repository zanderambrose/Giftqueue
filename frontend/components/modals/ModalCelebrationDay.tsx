import React, { useState } from "react";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Calendar from "react-calendar";
import { useRecoilState } from "recoil";
import {
  defaultCelebrationDayModalState,
  celebrationDayModal,
} from "../../recoil/modal/celebrationDay";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCelebrationApi } from "../../util/clientApi";
import {
  TCelebrationCreate,
  TCelebrationDetail,
} from "../../util/typesClientApi";
import { formatDateSending } from "../../util/dateHelper";

type ModalCelebrationDayInputs = {
  name: string;
  date: string;
};
export const ModalCelebrationDay = () => {
  // REACT HOOK FORMS
  const {
    register,
    handleSubmit,
    watch,
    reset,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<ModalCelebrationDayInputs>();
  const [dateSelected, setDateSelected] = useState(new Date());

  const queryClient = useQueryClient();
  const { createCelebration, editCelebrationItem } = useCelebrationApi();
  const [celebrationDayModalShow, setCelebrationDayModalShow] =
    useRecoilState(celebrationDayModal);

  const patchMutation = useMutation({
    mutationFn: (items: TCelebrationDetail) => {
      return editCelebrationItem(items);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myCelebrations"] });
    },
  });
  const createMutation = useMutation({
    mutationFn: (items: TCelebrationCreate) => {
      return createCelebration(items);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myCelebrations"] });
    },
  });

  const handleModalRequest: SubmitHandler<ModalCelebrationDayInputs> = async (
    data
  ) => {
    // If there is a uuid, we are PATCHING an item
    if (celebrationDayModalShow.uuid) {
      const patchDict: TCelebrationDetail = {
        uuid: celebrationDayModalShow.uuid,
      };
      if (data.name) patchDict["name"] = data.name;
      if (dateSelected) patchDict["date"] = formatDateSending(dateSelected);
      patchMutation.mutate(patchDict);
    } else {
      // We are creating an item since we do not have uuid
      createMutation.mutate({
        name: data.name,
        date: formatDateSending(dateSelected),
      });
    }
    handleModalReset();
  };

  const handleModalReset = () => {
    reset();
    clearErrors();
    setCelebrationDayModalShow(defaultCelebrationDayModalState);
    setDateSelected(new Date());
  };

  const handleIsRequired = (): boolean => {
    if (celebrationDayModalShow.uuid) return false;
    return true;
  };

  return (
    <>
      {celebrationDayModalShow.isOpen ? (
        <>
          <div
            // onClick={() => setAddFirstDayModal(false)}
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-11/12 md:w-10/12 lg:w-8/12 xl:w-6/12 my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5">
                  <h3 className="text-lg font-semibold">Add New Event</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={handleModalReset}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      <FontAwesomeIcon className="text-black" icon={faX} />
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative px-6 flex-auto">
                  <form onSubmit={handleSubmit(handleModalRequest)}>
                    <input
                      {...register("name", { required: handleIsRequired() })}
                      type="text"
                      placeholder="Enter Event Title"
                      className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-md shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    />
                    <label className="block mt-8">
                      <span className="block text-md font-medium">
                        Select Date
                      </span>
                    </label>
                    <Calendar onChange={setDateSelected} value={dateSelected} />
                    <div className="text-center block p-6">
                      <button
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
