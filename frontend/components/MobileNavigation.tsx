import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faUserGroup,
  faChampagneGlasses,
  faGift,
} from "@fortawesome/free-solid-svg-icons";
import { useRecoilState } from "recoil";
import {
  navigationState,
  TNavOptions,
} from "../recoil/navigation/navigationState";
import { useRouter } from "next/router";

export const MobileNavigation = () => {
  const [navState, setNavState] = useRecoilState(navigationState);
  const router = useRouter();

  const handleNavStateChange = (navItemState: TNavOptions) => {
    // when user navigates, always bring them back to main url
    // url only changes on friend detail page to /[username]
    if (router.pathname !== "/") {
      router.push("/");
    }
    setNavState(navItemState);
  };

  return (
    <div className="bottom-mobile-nav mobile-nav-shadow">
      <FontAwesomeIcon
        size="xl"
        className={
          navState === "giftqueue"
            ? "mobile-nav-link nav-link-grow-up ml-10"
            : "mobile-nav-link ml-10"
        }
        onClick={() => handleNavStateChange("giftqueue")}
        icon={faGift}
      />
      <FontAwesomeIcon
        size="xl"
        className={
          navState === "day"
            ? "mobile-nav-link nav-link-grow-up"
            : "mobile-nav-link"
        }
        onClick={() => handleNavStateChange("day")}
        icon={faChampagneGlasses}
      />
      <FontAwesomeIcon
        size="xl"
        className={
          navState === "friends"
            ? "mobile-nav-link nav-link-grow-up"
            : "mobile-nav-link"
        }
        onClick={() => handleNavStateChange("friends")}
        icon={faUserGroup}
      />
      <FontAwesomeIcon
        size="xl"
        className={
          navState === "calendar"
            ? "mobile-nav-link nav-link-grow-up mr-10"
            : "mobile-nav-link mr-10"
        }
        onClick={() => handleNavStateChange("calendar")}
        icon={faCalendar}
      />
    </div>
  );
};
