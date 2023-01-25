import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGroup,
  faAngleDown,
  faEarthAmericas,
} from "@fortawesome/free-solid-svg-icons";

const ActivityFeedSidebar = () => {
  return (
    <div className="min-height-content">
      <div className="relative top-10 pb-8 border-b-2">
        <div className="flex mx-auto items-center justify-center w-full">
          <FontAwesomeIcon icon={faUserGroup} />
          <p className="ml-2 text-base text-slate-500">Latest Updates</p>
        </div>
        <div className="flex justify-center items-center mt-4">
          <div className="text-black text-sm text-center mr-2">Today</div>
          <FontAwesomeIcon icon={faAngleDown} />
        </div>
      </div>
      <div className="relative top-10 mt-8 flex justify-center items-center">
        <FontAwesomeIcon
          style={{ color: "#aa96da" }}
          size="4x"
          icon={faEarthAmericas}
        />
      </div>
      <p
        className="text-center relative top-10 mt-8 italic"
        style={{ color: "#aa96da" }}
      >
        Nothing new yet!
      </p>
    </div>
  );
};

export default ActivityFeedSidebar;
