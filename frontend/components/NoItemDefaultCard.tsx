import React from "react";
import BtnPrimary from "./buttons/BtnPrimary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilValue, useRecoilState } from "recoil";
import { giftqueueItem } from "../recoil/modal/giftqueueItem";
import { celebrationDayModal } from "../recoil/modal/celebrationDay";
import { navigationState } from "../recoil/navigation/navigationState";

const NoItemDefaultCard = ({
    icon,
    headingText,
    subText,
    ctaButton = true
}: {
    icon: any;
    headingText: string;
    subText: string;
    ctaButton?: boolean
}) => {
    const [giftqueueItemModalShow, setGiftqueueItemModalShow] =
        useRecoilState(giftqueueItem);

    const [celebrationDayModalShow, setCelebrationDayModalShow] =
        useRecoilState(celebrationDayModal);

    const currentNavigationState = useRecoilValue(navigationState);

    const clickHandlerAction = () => {
        if (currentNavigationState === "giftqueue") {
            setGiftqueueItemModalShow((currVal) => {
                return {
                    ...currVal,
                    isOpen: true,
                };
            });
        }
        if (currentNavigationState === "day") {
            setCelebrationDayModalShow((currVal) => {
                return {
                    ...currVal,
                    isOpen: true,
                };
            });
        }
    };

    return (
        <>
            <div className="rounded-lg w-11/12 md:w-10/12 lg:4/5 m-auto relative top-10 bg-white">
                <div className="p-10 md:p-15 lg:p-20 text-center">
                    <FontAwesomeIcon className="gqp" size="5x" icon={icon} />
                    <h1 className="font-black mt-4">{headingText}</h1>
                    <p>{subText}</p>
                    {ctaButton && <BtnPrimary clickHandler={clickHandlerAction} text="Add New Event" />}
                </div>
            </div>
        </>
    );
};

export default NoItemDefaultCard;
