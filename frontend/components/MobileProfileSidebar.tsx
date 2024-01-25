import React from "react";
import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChampagneGlasses, faX } from "@fortawesome/free-solid-svg-icons";
import { useRecoilState } from "recoil";
import { modalProfileSidebar } from "../recoil/modal/modalProfileSidebar";
import { ProfileSettingsButton } from "./ProfileSettingsButton";
import { useUserSettings } from '../util/clientApi'
import { useQuery } from "@tanstack/react-query";

const MobileProfileSidebar = () => {
    const [isProfileSidebarOpen, setIsProfileSidebarOpen] =
        useRecoilState(modalProfileSidebar);
    const { data: session } = useSession();
    const { getUserSettings } = useUserSettings()
    const { data } = useQuery({
        queryKey: ["myUserSettings"],
        queryFn: getUserSettings,
    });

    const displayName = () => {
        if (data && data.display_name) {
            return data.display_name
        }
        return session?.user?.name ?? ""
    }

    const imageSrc = () => {
        if (data && data.profile_image) {
            return `${process.env.NEXT_PUBLIC_REGISTRY_BASE_URL}${data.profile_image}`
        }
        return session?.user?.image ?? ""
    }

    return (
        <>
            {isProfileSidebarOpen ? (
                <div
                    className={`${"animate-mobile-profile-sidebar"} h-full min-h-full bg-white top-0 left-0 absolute z-10 w-full`}
                >
                    <span
                        onClick={() => setIsProfileSidebarOpen(false)}
                        className="p-4 z-20 absolute top-4 right-4 text-black block cursor-pointer hover:opacity-80"
                    >
                        <FontAwesomeIcon
                            className="text-black cursor-pointer hover:opacity-80"
                            size="2x"
                            icon={faX}
                        />
                    </span>
                    <div className="text-center relative top-10 w-10/12 mx-auto pb-8 border-b-2">
                        <img
                            src={imageSrc()}
                            width={"152"}
                            height={"152"}
                            alt={"profile picture"}
                            className="block m-auto rounded-2xl"
                        />
                        <div className="mt-8 mx-auto flex justify-center items-center">
                            <h1 className="text-base font-black">{displayName()}</h1>
                            <ProfileSettingsButton />
                        </div>
                        <p className="mt-4 text-sm text-slate-500">Joined since Jan 2023</p>
                    </div>
                    <div
                        className="w-10/12 h-36 mx-auto mt-8 relative top-10 p-4 rounded-2xl"
                        style={{ backgroundColor: "#ffffd2" }}
                    >
                        <div className="flex items-center">
                            <FontAwesomeIcon
                                style={{ color: "#64748b" }}
                                icon={faChampagneGlasses}
                            />
                            <p className="ml-2 text-slate-500">Upcoming Event!</p>
                        </div>
                        <p className="mt-4 text-base font-black">No Events added yet!</p>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default MobileProfileSidebar;
