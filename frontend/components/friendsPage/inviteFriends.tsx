import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface IInviteFriendsProps {
    friendsQty: number;
    handleClick: () => any
}

export const InviteFriends = ({ friendsQty, handleClick }: IInviteFriendsProps) => {

    return (
        <div className="flex items-start justify-between mt-2 px-2">
            <p className="mt-4 relative right-2">
                <span className="gqp">
                    {friendsQty}
                </span>{" "}
                Friends found
            </p>
            <button
                onClick={handleClick}
                className="btn-add-new rounded relative left-2 hover:opacity-80"
            >
                <FontAwesomeIcon className="relative right-2" icon={faPlus} />
                Invite
            </button>
        </div>

    )
}
