import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { useFriendshipApi } from "../util/clientApi";
import { useMutation } from "@tanstack/react-query";

interface IFriendCardProps {
    name: string;
    image: string;
    isFriend?: boolean;
    sub?: string;
    inviteToGq?: boolean;
    fromGiftqueueBackend?: boolean;
    gqId?: string;
    displayName?: string
}

const FriendCard = ({
    name,
    image,
    isFriend,
    sub,
    fromGiftqueueBackend,
    gqId,
    displayName
}: IFriendCardProps) => {
    const { sendFriendRequest } = useFriendshipApi();
    const [isGiftqueueUser, setIsGiftqueueUser] = useState(false);
    const [hasSentInvite, setHasSentInvite] = useState(false);
    let placeholderNameForTesting = "zander";
    const router = useRouter();
    // This will be set up as props passed in from data fetch
    const handleFriendDetailPage = () => {
        if (isGiftqueueUser) {
            router.push(`/${placeholderNameForTesting}`);
        }
    };

    const sendFriendRequestMutation = useMutation({
        mutationFn: (requestee: string) => {
            return sendFriendRequest(requestee);
        },
        onSuccess: () => {
            setHasSentInvite(true);
        },
    });

    const handleSendFriendRequest = async () => {
        sendFriendRequestMutation.mutate(gqId!)
    };

    const handleInviteToGiftqueue = () => {
        alert("Invite functionality pending");
    };

    return (
        <div className="friendCard relative">
            <FontAwesomeIcon
                className="absolute top-4 right-6"
                size="lg"
                icon={faEllipsisVertical}
            />
            <div className="mt-4">
                <img
                    src={image}
                    width={"74"}
                    height={"74"}
                    alt="profile"
                    className="rounded-2xl mx-auto"
                    onClick={() => handleFriendDetailPage()}
                />
            </div>
            <h1 className="mt-4 text-lg">{displayName ?? name}</h1>
            {isFriend ? (
                <>
                    <p className="text-sm muted">Friends since Feb-2023</p>
                    <p className="italic text-sm text-black mt-4">
                        Nearest Upcoming event: 11-2-2023
                    </p>
                    <p>
                        (<span className="text-sm gqp px-1 italic">21 days remaining</span>)
                    </p>
                </>
            ) : (
                <>
                    <p className="text-sm muted">Not a friend yet</p>
                    <div
                        className={`${hasSentInvite ? "friendRequestBtnDisabled hover:opacity-80" : "friendRequestBtn hover:opacity-80"}`}
                    >
                        {isGiftqueueUser && gqId && (
                            <button className="text-white">
                                {hasSentInvite ? "Request Sent" : "Send friend request"}
                            </button>
                        )}
                        {!isGiftqueueUser && !fromGiftqueueBackend && (
                            <button
                                onClick={() => handleInviteToGiftqueue()}
                                className="text-white"
                            >
                                Invite To Giftqueue
                            </button>
                        )}
                        {fromGiftqueueBackend && gqId && (
                            <button
                                onClick={handleSendFriendRequest}
                                className="text-white"
                                disabled={hasSentInvite}
                            >
                                {hasSentInvite ? "Request Sent" : "Send friend request"}
                            </button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default FriendCard;
