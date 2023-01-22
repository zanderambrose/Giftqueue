import React from "react";
import ActivityFeedSidebar from "./ActivityFeedSidebar";
import Maincontent from "./Maincontent";
import Navigation from "./Navigation";
import ProfileSidebar from "./ProfileSidebar";

const Layout = () => {
  return (
    <>
      <div className="h-24">
        <Navigation />
      </div>
      <div className="flex main-content">
        <div className="basis-1/4">
          <ProfileSidebar />
        </div>
        <div className="overflow-scroll basis-1/2">
          <Maincontent />
        </div>
        <div className="basis-1/4">
          <ActivityFeedSidebar />
        </div>
      </div>
    </>
  );
};

export default Layout;
