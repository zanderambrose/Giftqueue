import React from "react";

const FriendEventCard = () => {
    return (
        <div className="friendEventCard gap-x-4">
            <div className="ml-4">
                <img
                    src={"/placeholderFriend.jpg"}
                    width={"74"}
                    height={"74"}
                    alt="profile"
                    className="rounded-2xl"
                />
            </div>
            <div className="flex-1">
                <h2 className="font-black text-lg">Zander Ambrose</h2>
                <p className="muted text-sm">My Wedding Day</p>
                <p className="text-sm">
                    <span className="text-blue-600">3 </span>items added to my wishlist
                </p>
            </div>
        </div>
    );
};

export default FriendEventCard;
