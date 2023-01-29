import React from "react";
import ActivityFeedSidebar from "./ActivityFeedSidebar";
import Maincontent from "./Maincontent";
import Navigation from "./Navigation";
import ProfileSidebar from "./ProfileSidebar";

const Layout = () => {
  return (
    <>
      <div className="navigation-layout">
        <Navigation />
      </div>
      <div className="flex main-content">
        <div className="sidebar-layout">
          <ProfileSidebar />
        </div>
        <div className="overflow-y-scroll flex-1">
          <Maincontent />
        </div>
        <div className="sidebar-layout overflow-y-scroll">
          <ActivityFeedSidebar />
        </div>
      </div>
    </>
  );
};

export default Layout;
