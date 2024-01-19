import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPen } from "@fortawesome/free-solid-svg-icons";
import { IGiftqueueSerializer } from "../util/typesClientApi";
import { useSetRecoilState } from "recoil";
import { giftqueueItem } from "../recoil/modal/giftqueueItem";
import { deleteGiftqueueItemModal } from "../recoil/modal/deleteGiftqueueItem";
import { howMuchTimeUntil } from "../util/dateHelper";

const GiftqueueItem = ({
    name,
    id,
    notes,
    url,
    owner,
    related_to,
}: IGiftqueueSerializer) => {
    const setGiftqueueItemModalShow = useSetRecoilState(giftqueueItem);
    const setDeleteItemShow = useSetRecoilState(deleteGiftqueueItemModal);
    const handleEditItemClick = () => {
        setGiftqueueItemModalShow((currVal) => {
            return {
                ...currVal,
                isOpen: true,
                uuid: id,
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
    return (
        <div key={id} className="myGiftqueueCard mt-4">
            <div className="flex flex-row">
                <div className="w-full flex flex-row justify-between items-center">
                    <div>
                        <h3 className="text-xl font-extrabold">{name}</h3>
                        {related_to && (
                            <p className="muted">
                                Related to: <span className="underline">{related_to.name}</span>{" "}
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
                    <p className="muted">Where to buy:</p>
                    <div className="flex flex-row items-center gap-4">
                        {url.map((url, idx) => {
                            return (
                                <a
                                    key={`${url}${idx}`}
                                    target={"_blank"}
                                    rel={"noreferrer"}
                                    className="text-sky-400"
                                    href={url}
                                >
                                    Link 1
                                </a>
                            );
                        })}
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
