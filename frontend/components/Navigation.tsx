import React from "react";
import { useRecoilState } from "recoil";
import {
    navigationState,
    TNavOptions,
} from "../recoil/navigation/navigationState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { faBell, faBars } from "@fortawesome/free-solid-svg-icons";
import { modalProfileSidebar } from "../recoil/modal/modalProfileSidebar";
import { modalActivityFeedSidebar } from "../recoil/modal/modalActivityFeedSidebar";
import { useSession, signIn, signOut } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { useFriendshipApi } from "../util/clientApi";

const Navigation = () => {
    const { data: session } = useSession();
    const [isProfileSidebarOpen, setIsProfileSidebarOpen] =
        useRecoilState(modalProfileSidebar);
    const [isActivityFeedSidebarOpen, setIsActivityFeedSidebarOpen] =
        useRecoilState(modalActivityFeedSidebar);

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

    const { getFriendRequest } = useFriendshipApi();
    const {
        isLoading: friendRequestIsLoading,
        error: friendRequestError,
        data: friendRequestData,
    } = useQuery({
        queryKey: ["myFriendRequests"],
        queryFn: getFriendRequest,
    });
    return (
        <>
            <nav className="h-full flex items-center nav-shadow nav-mobile-hidden">
                <div onClick={() => handleRouteHome()} className="absolute left-2">
                    <img
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
                            navState === "giftqueue"
                                ? "nav-link nav-link-grow-up"
                                : "nav-link"
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
                        {!session ? (
                            <div
                                onClick={() => signIn("google")}
                                className="flex justify-center items-center cursor-pointer"
                            >
                                <FontAwesomeIcon icon={faArrowRightFromBracket} />
                                <div className="ml-2">Login</div>
                            </div>
                        ) : (
                            <div
                                onClick={() => signOut()}
                                className="flex justify-center items-center cursor-pointer"
                            >
                                <FontAwesomeIcon icon={faArrowRightFromBracket} />
                                <div className="ml-2">Logout</div>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
            <nav className="h-full nav-shadow nav-mobile">
                <FontAwesomeIcon
                    onClick={() => setIsProfileSidebarOpen(true)}
                    className="ml-6 hover:opacity-80"
                    size="2x"
                    icon={faBars}
                />
                <img
                    onClick={() => handleRouteHome()}
                    src="/giftqueueLogo.png"
                    width={"78"}
                    height={"56"}
                    alt={"giftqueue logo"}
                />
                <FontAwesomeIcon
                    onClick={() => setIsActivityFeedSidebarOpen(true)}
                    size="2x"
                    className="gqp mr-6 hover:opacity-80"
                    icon={faBell}
                />
                {friendRequestData && friendRequestData.length > 0 && (
                    <span
                        style={{
                            height: "15px",
                            width: "15px",
                            backgroundColor: "red",
                            borderRadius: "50%",
                            display: "inline-block",
                            position: "absolute",
                            right: "22px",
                            top: "20px",
                        }}
                    ></span>
                )}
            </nav>
        </>
    );
};

export default Navigation;
