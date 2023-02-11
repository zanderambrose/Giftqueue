import React from "react";
import ActivityFeedSidebar from "./ActivityFeedSidebar";
import Maincontent from "./Maincontent";
import Navigation from "./Navigation";
import ProfileSidebar from "./ProfileSidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faCalendar,
  faUserGroup,
  faChampagneGlasses,
  faGift,
} from "@fortawesome/free-solid-svg-icons";

const Layout = () => {
  return (
    <>
      <div className="navigation-layout">
        <Navigation />
      </div>
      <div className="flex main-content">
        <div className="sidebar-layout sidebar-left-hidden">
          <ProfileSidebar />
        </div>
        <div className="overflow-y-scroll flex-1">
          <Maincontent />
        </div>
        <div className="sidebar-layout overflow-y-scroll sidebar-right-hidden">
          <ActivityFeedSidebar />
        </div>
      </div>
      <div className="bottom-mobile-nav">
        <FontAwesomeIcon className="ml-10" size="2x" icon={faGift} />
        <FontAwesomeIcon size="2x" icon={faChampagneGlasses} />
        <FontAwesomeIcon size="2x" icon={faUserGroup} />
        <FontAwesomeIcon className="mr-10" size="2x" icon={faCalendar} />
      </div>
    </>
  );
};

export default Layout;
