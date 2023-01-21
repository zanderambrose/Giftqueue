import React from "react";
import ActivityFeedSidebar from "./ActivityFeedSidebar";
import Maincontent from "./Maincontent";
import Navigation from "./Navigation";
import ProfileSidebar from "./ProfileSidebar";

const Layout = ({ children }: { children: any }) => {
  return (
    <>
      <Navigation />
      <div className="flex flex-row">
        <div className="basis-1/4">
          <ProfileSidebar />
        </div>
        <div className="basis-1/2">
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
