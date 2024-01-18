import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useActivityFeed } from "../../util/clientApi";
import { faEarthAmericas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ActivitySidebarEventCard from "../ActivitySidebarEventCard";

const CurrentActivity = () => {
    const { getActivity } = useActivityFeed();
    const {
        isLoading: activityIsLoading,
        error: activityError,
        data: activityData,
    } = useQuery({
        queryKey: ["myActivity"],
        queryFn: getActivity,
    });
    return (
        <>
            {!activityData || activityData.length < 1 ? (
                <>
                    <div className="flex justify-center items-center">
                        <FontAwesomeIcon className="gqp" size="4x" icon={faEarthAmericas} />
                    </div>
                    <p className="text-center mt-8 italic gqp">Nothing new yet!</p>
                </>
            ) : (
                <>
                    {activityData &&
                        activityData.length > 0 &&
                        activityData.map((item: any) => {
                            return (
                                <ActivitySidebarEventCard
                                    firstName={item.owner.first_name}
                                    lastName={item.owner.last_name}
                                    action={item.action}
                                    timeAgo={item.time_ago}
                                    item={item.name}
                                />
                            );
                        })}
                </>
            )}
        </>
    );
};

export default CurrentActivity;
