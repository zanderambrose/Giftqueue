import React from "react";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSetRecoilState } from "recoil";
import {
  defaultCelebrationDayModalState,
  celebrationDayModal,
} from "../recoil/modal/celebrationDay";
import { deleteCelebrationItemModal } from "../recoil/modal/deleteCelebrationItem";

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

  return (
    <div className="friendEventCard">
      <div className="w-full mx-6 flex flex-row justify-between items-center">
        <div>
          <h2 className="font-black text-lg">{name}</h2>
          <p className="text-sm">
            <span className="text-blue-600">3 </span>items added to my wishlist
          </p>
        </div>
        {canEdit && (
          <div>
            <FontAwesomeIcon
              onClick={handleDeleteItemClick}
              size="lg"
              className="muted mr-6"
              icon={faTrashCan}
            />
            <FontAwesomeIcon
              onClick={handleEditItemClick}
              size="lg"
              className="gqp"
              icon={faPen}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendEventCard;
