import React from "react";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IEventCard {
  name: string;
  canEdit?: boolean;
}

const FriendEventCard = ({ name, canEdit = true }: IEventCard) => {
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
              size="lg"
              className="muted mr-6"
              icon={faTrashCan}
            />
            <FontAwesomeIcon size="lg" className="gqp" icon={faPen} />
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendEventCard;
