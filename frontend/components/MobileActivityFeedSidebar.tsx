import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useRecoilState } from "recoil";
import { modalActivityFeedSidebar } from "../recoil/modal/modalActivityFeedSidebar";
import ActivityFeedData from "./activityFeed/ActivityFeedData";

const ActivityFeedSidebar = () => {
    const [isActivityFeedSidebarOpen, setIsActivityFeedSidebarOpen] =
        useRecoilState(modalActivityFeedSidebar);
    return (
        <>
            {isActivityFeedSidebarOpen ? (
                <div
                    className={`${"animate-mobile-activity-sidebar"} h-full min-h-full bg-white top-0 left-0 absolute z-10 w-full`}
                >
                    <span
                        onClick={() => setIsActivityFeedSidebarOpen(false)}
                        className="p-4 z-20 absolute top-4 right-4 text-black block cursor-pointer hover:opacity-80"
                    >
                        <FontAwesomeIcon
                            className="text-black cursor-pointer hover:opacity-80"
                            size="2x"
                            icon={faX}
                        />
                    </span>
                    <ActivityFeedData />
                </div>
            ) : null}
        </>
    );
};

export default ActivityFeedSidebar;
