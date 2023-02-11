import React from "react";
import { useRecoilState } from "recoil";
import {
  navigationState,
  TNavOptions,
} from "../recoil/navigation/navigationState";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

const Navigation = () => {
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

  const handleRouteHome = () => {
    router.push("/");
    setNavState("giftqueue");
  };

  return (
    <nav className="h-full flex items-center nav-shadow">
      <div onClick={() => handleRouteHome()} className="absolute left-2">
        <Image
          src="/giftqueueLogo.png"
          width={"78"}
          height={"56"}
          alt={"giftqueue logo"}
        />
      </div>
      <div className="sidebar-layout sidebar-left-hidden"></div>
      <div className="flex-1 flex justify-around handle-responsive-margin">
        <h3
          className={
            navState === "giftqueue" ? "nav-link nav-link-grow-up" : "nav-link"
          }
          onClick={() => handleNavStateChange("giftqueue")}
        >
          Giftqueue
        </h3>
        <h3
          className={
            navState === "day" ? "nav-link nav-link-grow-up" : "nav-link"
          }
          onClick={() => handleNavStateChange("day")}
        >
          Celebrations
        </h3>
        <h3
          className={
            navState === "friends" ? "nav-link nav-link-grow-up" : "nav-link"
          }
          onClick={() => handleNavStateChange("friends")}
        >
          Friends
        </h3>
        <h3
          className={
            navState === "calendar" ? "nav-link nav-link-grow-up" : "nav-link"
          }
          onClick={() => handleNavStateChange("calendar")}
        >
          Calendar
        </h3>
      </div>
      <div className="sidebar-layout sidebar-right-hidden">
        <div className="text-center">
          <div className="flex justify-center items-center cursor-pointer">
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
            <div className="ml-2">Logout</div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
