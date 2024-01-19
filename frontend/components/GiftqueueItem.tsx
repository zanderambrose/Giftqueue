import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPen } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IGiftqueueSerializer } from "../util/typesClientApi";
import { useSetRecoilState } from "recoil";
import { giftqueueItem } from "../recoil/modal/giftqueueItem";
import { deleteGiftqueueItemModal } from "../recoil/modal/deleteGiftqueueItem";
import { howMuchTimeUntil } from "../util/dateHelper";
import { useGiftItemUrlApi } from "../util/clientApi";

const GiftqueueItem = ({
    name,
    id,
    notes,
    url,
    related_to,
}: IGiftqueueSerializer) => {
    const queryClient = useQueryClient();
    const { deleteGiftItemUrl } = useGiftItemUrlApi();
    const setGiftqueueItemModalShow = useSetRecoilState(giftqueueItem);
    const setDeleteItemShow = useSetRecoilState(deleteGiftqueueItemModal);
    const handleEditItemClick = () => {
        setGiftqueueItemModalShow((currVal) => {
            return {
                ...currVal,
                isOpen: true,
                uuid: id,
                data: {
                    name,
                    notes,
                    url,
                    related_to,
                }
            };
        });
    };
    const handleDeleteItemClick = () => {
        setDeleteItemShow((currVal) => {
            return {
                ...currVal,
                isOpen: true,
                uuid: id,
            };
        });
    };

    const deleteUrlMutation = useMutation({
        mutationFn: (uuid: string) => {
            return deleteGiftItemUrl(uuid);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["myGiftqueueItems"] });
        },
    });

    const handleDeleteUrlClick = (id: number) => {
        deleteUrlMutation.mutate(String(id))
    }

    return (
        <div key={id} className="myGiftqueueCard mt-4">
            <div className="flex flex-row">
                <div className="w-full flex flex-row justify-between items-center">
                    <div>
                        <h3 className="text-2xl font-extrabold">{name}</h3>
                        {related_to && (
                            <p className="mt-4 muted">
                                Reserved for: <span className="underline">{related_to.name}</span>{" "}
                                {howMuchTimeUntil(related_to.date) < 30 &&
                                    howMuchTimeUntil(related_to.date) > 0 &&
                                    `, ${howMuchTimeUntil(related_to.date)} days remaining`}
                            </p>
                        )}
                    </div>
                    <div>
                        <FontAwesomeIcon
                            onClick={() => handleDeleteItemClick()}
                            size="lg"
                            className="muted mr-6 hover:opacity-80"
                            icon={faTrashCan}
                        />
                        <FontAwesomeIcon
                            onClick={() => handleEditItemClick()}
                            size="lg"
                            className="gqp hover:opacity-80"
                            icon={faPen}
                        />
                    </div>
                </div>
            </div>
            {url && url.length > 0 && (
                <div className="mt-4">
                    <p className="muted">Buy it here:</p>
                    <div className="flex flex-row items-center gap-4">
                        <ul>
                            {url.map(({ url, id }, idx) => {
                                return (
                                    <li key={url}>
                                        <a
                                            key={`${url}${idx}`}
                                            target={"_blank"}
                                            rel={"noreferrer"}
                                            className="text-blue-400 hover:text-blue-700"
                                            href={url}
                                        >
                                            {new URL(url).hostname}
                                        </a>
                                        <FontAwesomeIcon
                                            onClick={() => handleDeleteUrlClick(id)}
                                            className="muted ml-4 hover:opacity-80"
                                            icon={faTrashCan}
                                        />
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            )}
            {notes && (
                <div className="mt-4">
                    <p className="muted">Notes:</p>
                    <p>{notes}</p>
                </div>
            )}
        </div>
    );
};

export default GiftqueueItem;
