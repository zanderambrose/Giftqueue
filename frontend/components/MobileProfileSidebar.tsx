import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChampagneGlasses } from "@fortawesome/free-solid-svg-icons";
import { useRecoilState } from "recoil";
import { modalProfileSidebar } from "../recoil/modal/modalProfileSidebar";

const MobileProfileSidebar = () => {
  const [isProfileSidebarOpen, setIsProfileSidebarOpen] =
    useRecoilState(modalProfileSidebar);

  const { data: session } = useSession();

  return (
    <div className="h-full min-h-full bg-white top-0 left-0 absolute z-10 w-10/12">
      <div className="text-center relative top-10 w-10/12 mx-auto pb-8 border-b-2">
        <Image
          src={"/placeholderFriend.jpg"}
          // src={session?.user?.image ?? ""}
          width={"152"}
          height={"152"}
          alt={"profile picture"}
          className="block m-auto rounded-2xl"
        />
        <h1 className="mt-8 text-base font-black">{session?.user?.name}</h1>
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
  );
};

export default MobileProfileSidebar;
