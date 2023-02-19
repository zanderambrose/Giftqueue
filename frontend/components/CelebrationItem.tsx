import React from "react";
import DateCard from "./DateCard";
import MyEventCard from "./MyEventCard";
import { ICelebrationSerializer } from "../util/typesClientApi";

export const CelebrationItem = ({ name, date, id }: ICelebrationSerializer) => {
  return (
    <div key={id} className="flex flex-row gap-x-4 mt-4">
      <div>
        <DateCard date={date} />
      </div>
      <div className="flex-1">
        <MyEventCard name={name} id={id} />
      </div>
    </div>
  );
};
