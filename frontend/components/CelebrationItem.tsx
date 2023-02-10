import React from "react";
import DateCard from "./DateCard";
import MyEventCard from "./MyEventCard";
import { ICelebrationSerializer } from "../util/typesClientApi";

export const CelebrationItem = ({ name, date }: ICelebrationSerializer) => {
  return (
    <div className="flex flex-row gap-x-4 mt-4">
      <div>
        <DateCard />
      </div>
      <div className="flex-1">
        <MyEventCard name={name} />
      </div>
    </div>
  );
};
