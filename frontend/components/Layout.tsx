import React from "react";
import ActivityFeedSidebar from "./ActivityFeedSidebar";
import Maincontent from "./Maincontent";
import Navigation from "./Navigation";
import ProfileSidebar from "./ProfileSidebar";
import { MobileNavigation } from "./MobileNavigation";
import MobileProfileSidebar from "./MobileProfileSidebar";
import MobileActivityFeedSidebar from "./MobileActivityFeedSidebar";
import { ModalUserSettings } from "./modals/ModalUserSettings";

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
            <ModalUserSettings />
            <MobileNavigation />
            <MobileProfileSidebar />
            <MobileActivityFeedSidebar />
        </>
    );
};

export default Layout;
