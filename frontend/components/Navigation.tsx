import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const Navigation = () => {
  return (
    <nav className="h-full flex items-center border-2 border-black">
      <div className="sidebar-layout">
        <Image src="/giftqueueLogo.png" width="78px" height="56px" />
      </div>
      <div className="flex-1 flex justify-around">
        <h3 className="nav-link nav-link-grow-up">Celebration Day</h3>
        <h3 className="nav-link nav-link-grow-up">Giftqueue</h3>
        <h3 className="nav-link nav-link-grow-up">Friends</h3>
        <h3 className="nav-link nav-link-grow-up">Calendar</h3>
      </div>
      <div className="sidebar-layout">
        <div className="text-center">
          <div className="flex justify-center items-center">
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
            <div className="ml-2">Logout</div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
