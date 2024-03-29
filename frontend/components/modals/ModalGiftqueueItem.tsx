import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import {
    giftqueueItem,
    defaultGiftqueueItemModalState,
} from "../../recoil/modal/giftqueueItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faX,
    faCircle,
    faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useCelebrationApi, useGiftqueueApi } from "../../util/clientApi";
import {
    IGiftqueueItemCreate,
    TGiftqueueDetailSerializer,
} from "../../util/typesClientApi";
import { useForm, SubmitHandler } from "react-hook-form";

type ModalGiftqueueItemInputs = {
    name: string;
    link: string | string[];
    notes: string;
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

    const [giftqueueFor, setGiftqueueFor] = useState<"anytime" | "related">(
        "anytime"
    );
    const [isRelatedToViewOpen, setIsRelatedToViewOpen] = useState(false);
    const [noItemsToAssociateWithOpen, setNoItemsToAssociateWithOpen] = useState(false)
    const queryClient = useQueryClient();
    const [relatedCelebrationPicked, setRelatedCelebrationPicked] = useState<
        undefined | { id: string; name: string }
    >(undefined);

    const { editGiftqueueItem, createGiftqueueItem } = useGiftqueueApi();
    const { getCelebrations } = useCelebrationApi();
    const [giftqueueItemModalShow, setGiftqueueItemModalShow] =
        useRecoilState(giftqueueItem);
    const { error, data } = useQuery({
        queryFn: getCelebrations,
        queryKey: ["myCelebrations"],
    });

    const patchMutation = useMutation({
        mutationFn: (items: TGiftqueueDetailSerializer) => {
            return editGiftqueueItem(items);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["myGiftqueueItems"] });
        },
    });
    const createMutation = useMutation({
        mutationFn: (items: IGiftqueueItemCreate) => {
            return createGiftqueueItem(items);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["myGiftqueueItems"] });
        },
    });

    const handleModalRequest: SubmitHandler<ModalGiftqueueItemInputs> = async (
        submitData
    ) => {
        // If there is a uuid, we are PATCHING an item
        if (giftqueueItemModalShow.uuid) {
            let patchDict: TGiftqueueDetailSerializer = {
                uuid: giftqueueItemModalShow.uuid,
            };
            if (submitData.name) {
                patchDict["name"] = submitData.name;
            }
            if (submitData.link) {
                patchDict["url"] = submitData.link;
            }
            if (submitData.notes) {
                patchDict["notes"] = submitData.notes;
            }
            if (relatedCelebrationPicked) {
                patchDict["related_to"] = relatedCelebrationPicked.id;
            }
            console.log("PATCH DICT: ", patchDict);
            patchMutation.mutate(patchDict);
        } else {
            let postDict: IGiftqueueItemCreate = {
                name: submitData.name,
            };
            if (submitData.link) {
                postDict["url"] = submitData.link;
            }
            if (submitData.notes) {
                postDict["notes"] = submitData.notes;
            }
            if (relatedCelebrationPicked) {
                postDict["related_to"] = relatedCelebrationPicked.id;
            }
            console.log("POST DICT: ", postDict);
            // We are creating an item since we do not have uuid
            createMutation.mutate(postDict);
        }
        handleModalReset();
    };

    useEffect(() => {
        reset({
            name: giftqueueItemModalShow.data?.name ?? "",
            notes: giftqueueItemModalShow.data?.notes ?? ""
        }
        )

        if (giftqueueItemModalShow.data?.related_to) {
            setGiftqueueFor("related")
            setRelatedCelebrationPicked({
                name: giftqueueItemModalShow.data?.related_to.name,
                id: giftqueueItemModalShow.data?.related_to.id
            })
        }

    }, [giftqueueItemModalShow])

    // Reset on component unmount
    useEffect(() => {
        return () => handleModalReset();
    }, []);
    const handleModalReset = () => {
        reset();
        clearErrors();
        setGiftqueueFor("anytime");
        setIsRelatedToViewOpen(false);
        setRelatedCelebrationPicked(undefined);
        setGiftqueueItemModalShow(defaultGiftqueueItemModalState);
        setNoItemsToAssociateWithOpen(false)
    };

    return (
        <>
            {giftqueueItemModalShow.isOpen ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-11/12 md:w-10/12 lg:w-8/12 xl:w-6/12 my-6 mx-auto max-w-3xl giftQueueModal">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {!isRelatedToViewOpen ? (
                                    <>
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
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            if (noItemsToAssociateWithOpen) setNoItemsToAssociateWithOpen(false)
                                                            setGiftqueueFor("anytime");
                                                            setRelatedCelebrationPicked(undefined);
                                                        }}
                                                        disabled={isSubmitting}
                                                        className={`text-left mt-4 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-md shadow-sm placeholder-slate-400 ${giftqueueFor === "anytime"
                                                            ? "ring-gqp ring-1 bg-gqp2"
                                                            : null
                                                            }`}
                                                    >
                                                        <FontAwesomeIcon
                                                            className={`${giftqueueFor === "anytime"
                                                                ? "gqp"
                                                                : "text-slate-300"
                                                                } mr-4`}
                                                            icon={
                                                                giftqueueFor === "anytime"
                                                                    ? faCircleCheck
                                                                    : faCircle
                                                            }
                                                        />
                                                        Anytime
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setGiftqueueFor("related");
                                                        }}
                                                        disabled={isSubmitting}
                                                        className={`text-left mt-4 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-md shadow-sm placeholder-slate-400 ${giftqueueFor === "related"
                                                            ? "ring-gqp ring-1 bg-gqp2"
                                                            : null
                                                            }`}
                                                    >
                                                        <FontAwesomeIcon
                                                            className={`${giftqueueFor === "related"
                                                                ? "gqp"
                                                                : "text-slate-300"
                                                                } mr-4`}
                                                            icon={
                                                                giftqueueFor === "related"
                                                                    ? faCircleCheck
                                                                    : faCircle
                                                            }
                                                        />
                                                        Related To Event
                                                        {relatedCelebrationPicked && (
                                                            <span className="text-small muted ml-2">
                                                                ({relatedCelebrationPicked.name})
                                                            </span>
                                                        )}
                                                    </button>
                                                    <button
                                                        disabled={giftqueueFor === "anytime" ? true : false}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            if (data && data.length > 0) {
                                                                setIsRelatedToViewOpen(true);
                                                            } else {
                                                                setNoItemsToAssociateWithOpen(true)
                                                            }
                                                        }}
                                                        className="mt-4 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-md shadow-sm placeholder-slate-400
      focus:outline-none focus:gqp focus:ring-1 focus:gqp disabled:opacity-25"
                                                    >
                                                        Select Event
                                                    </button>
                                                </label>
                                                {noItemsToAssociateWithOpen && <p className="mt-4 text-red-500">No events to associate gift with</p>}
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
                                    </>
                                ) : (
                                    <>
                                        <div className="flex items-start justify-between p-5">
                                            <h3 className="text-lg font-semibold">
                                                Select the Event for your giftqueue item
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
                                            {data?.map((item) => {
                                                return (
                                                    <div key={item.id}>
                                                        <button
                                                            onClick={(e) => {
                                                                setRelatedCelebrationPicked({
                                                                    name: item.name,
                                                                    id: item.id,
                                                                });
                                                                e.preventDefault();
                                                            }}
                                                            disabled={isSubmitting}
                                                            className={`text-left mb-4 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-md shadow-sm placeholder-slate-400 ${relatedCelebrationPicked?.id === item.id
                                                                ? "ring-gqp ring-1 bg-gqp2"
                                                                : null
                                                                }`}
                                                        >
                                                            <FontAwesomeIcon
                                                                className={`${relatedCelebrationPicked?.id === item.id
                                                                    ? "gqp"
                                                                    : "text-slate-300"
                                                                    } mr-4`}
                                                                icon={
                                                                    relatedCelebrationPicked?.id === item.id
                                                                        ? faCircleCheck
                                                                        : faCircle
                                                                }
                                                            />
                                                            {item.name}
                                                        </button>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className="flex flex-row items-center justify-center mb-6">
                                            <button
                                                onClick={() => setIsRelatedToViewOpen(false)}
                                                className="eventModalCancelBtn mr-2"
                                                type="button"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={() => setIsRelatedToViewOpen(false)}
                                                className="eventModalConfirmBtn ml-2"
                                                type="button"
                                            >
                                                Confirm
                                            </button>
                                        </div>
                                    </>
                                )}
                                {/*header*/}
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
