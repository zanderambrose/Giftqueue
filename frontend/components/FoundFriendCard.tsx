import React from "react";

const FriendCard = () => {
    return (
        <div className="friendCard">
            <div className="mt-4">
                <img
                    src={"/placeholderFriend.jpg"}
                    width={"74"}
                    height={"74"}
                    alt="profile"
                    className="rounded-2xl mx-auto"
                />
            </div>
            <h1 className="mt-4 text-lg">Zander Ambrose</h1>
            <p className="text-sm text-slate-400">Not a friend yet</p>
            <div className="friendRequestBtn hover:opacity-80">
                <button className="text-white">Send friend request</button>
            </div>
        </div>
    );
};

export default FriendCard;
