import { useSetRecoilState } from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { userSettingsModal } from "../recoil/modal/userSettings";

export const ProfileSettingsButton = () => {
    const setUserSettingsModalShow =
        useSetRecoilState(userSettingsModal);

    const handleSettingsButtonClick = () => {
        setUserSettingsModalShow((currVal) => {
            return {
                ...currVal,
                isOpen: true,
            };
        });
    };

    return (
        <FontAwesomeIcon
            style={{ color: "#64748b" }}
            icon={faGear}
            className="pl-2 hover:opacity-80"
            onClick={handleSettingsButtonClick}
        />
    )

}
