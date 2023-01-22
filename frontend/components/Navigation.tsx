import React from "react";
import Image from "next/image";

const Navigation = () => {
  return (
    <nav className="h-full flex items-center border-2 border-black">
      <div className="sidebar-layout">
        <Image src="/giftqueueLogo.png" width="78px" height="56px" />
      </div>
      <div className="flex-1 flex justify-around">
        <h3>Celebration Day</h3>
        <h3>Giftqueue</h3>
        <h3>Friends</h3>
        <h3>Calendar</h3>
      </div>
      <div className="sidebar-layout">
        <div className="text-center">Layout</div>
      </div>
    </nav>
  );
};

export default Navigation;
