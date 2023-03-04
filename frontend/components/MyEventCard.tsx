import React, { useState } from "react";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSetRecoilState } from "recoil";
import {
  defaultCelebrationDayModalState,
  celebrationDayModal,
} from "../recoil/modal/celebrationDay";
import { deleteCelebrationItemModal } from "../recoil/modal/deleteCelebrationItem";
import { useQuery } from "@tanstack/react-query";
import { useGiftqueueApi } from "../util/clientApi";
import { ModalRelatedGiftqueueItem } from "./modals/ModalRelatedGiftqueueItem";
import { IGiftqueueSerializer } from "../util/typesClientApi";

interface IEventCard {
  name: string;
  id: string;
  canEdit?: boolean;
}

const FriendEventCard = ({ name, id, canEdit = true }: IEventCard) => {
  const setCelebrationDayModalShow = useSetRecoilState(celebrationDayModal);
  const setDeleteItemShow = useSetRecoilState(deleteCelebrationItemModal);

  const handleEditItemClick = () => {
    setCelebrationDayModalShow((currVal) => {
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

  const [relatedItems, setRelatedItems] = useState(0);
  const [relatedItemsData, setRelatedItemsData] =
    useState<IGiftqueueSerializer[]>();
  const { getGiftqueueItems } = useGiftqueueApi();
  useQuery({
    queryKey: ["myGiftqueueItems"],
    queryFn: getGiftqueueItems,
    onSuccess: (data) => {
      const totalNumber = data.filter((item) => {
        return item.related_to?.id === id;
      });
      setRelatedItems(totalNumber.length);
      setRelatedItemsData(totalNumber);
    },
  });

  const [relatedGiftqueueModal, setRelatedGiftqueueModal] = useState(false);

  return (
    <>
      <div className="friendEventCard">
        <div className="w-full mx-6 flex flex-row justify-between items-center">
          <div>
            <h2 className="font-black text-lg">{name}</h2>
            {relatedItems > 0 && (
              <p className="text-sm">
                <span
                  onClick={() => setRelatedGiftqueueModal(true)}
                  className="text-blue-600 cursor-pointer hover:opacity-80"
                >
                  {relatedItems}{" "}
                </span>
                items added to my wishlist
              </p>
            )}
          </div>
          {canEdit && (
            <div>
              <FontAwesomeIcon
                onClick={handleDeleteItemClick}
                size="lg"
                className="muted mr-6 hover:opacity-80"
                icon={faTrashCan}
              />
              <FontAwesomeIcon
                onClick={handleEditItemClick}
                size="lg"
                className="gqp hover:opacity-80"
                icon={faPen}
              />
            </div>
          )}
        </div>
      </div>
      {relatedItemsData && (
        <ModalRelatedGiftqueueItem
          isOpen={relatedGiftqueueModal}
          setIsOpen={setRelatedGiftqueueModal}
          giftqueueItemData={relatedItemsData}
          name={name}
        />
      )}
    </>
  );
};

export default FriendEventCard;
