import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useSetRecoilState } from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChampagneGlasses, faGear } from "@fortawesome/free-solid-svg-icons";
import { useUserSettings } from '../util/clientApi'
import {
    defaultUserSettingsModalState,
    userSettingsModal,
} from "../recoil/modal/userSettings";
import { ModalUserSettings } from '../components/modals/ModalUserSettings'

const ProfileSidebar = () => {
    const { data: session } = useSession();
    const setUserSettingsModalShow =
        useSetRecoilState(userSettingsModal);
    const { getUserSettings, updateUserSettings } = useUserSettings()
    const { data } = useQuery({
        queryKey: ["myUserSettings"],
        queryFn: getUserSettings,
    });

    const imageSrc = () => {
        if (data && data.profile_image) {
            return `${process.env.NEXT_PUBLIC_REGISTRY_BASE_URL}${data.profile_image}`
        }
        return session?.user?.image ?? ""
    }

    const displayName = () => {
        if (data && data.display_name) {
            return data.display_name
        }
        return session?.user?.name ?? ""
    }

    const handleSettingsButtonClick = () => {
        setUserSettingsModalShow((currVal) => {
            return {
                ...currVal,
                isOpen: true,
            };
        });
    };

    return (
        <>
            <div>
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
                        <FontAwesomeIcon
                            style={{ color: "#64748b" }}
                            icon={faGear}
                            className="pl-2 hover:opacity-80"
                            onClick={handleSettingsButtonClick}
                        />
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
            <ModalUserSettings />
        </>
    );
};

export default ProfileSidebar;
