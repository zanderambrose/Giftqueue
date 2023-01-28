import React from "react";

import ReactCalendar from "react-calendar";
import DateCard from "./DateCard";
import FriendEventCard from "./FriendEventCard";

const Calendar = () => {
  return (
    <div className="relative top-10 px-8">
      <h1 className="text-lg relative right-2">All Events</h1>
      <div className="mt-4">
        <ReactCalendar />
      </div>
      <div className="flex flex-row gap-x-4 mt-4">
        <div>
          <DateCard />
        </div>
        <div className="flex-1">
          <FriendEventCard />
        </div>
      </div>
    </div>
  );
};

export default Calendar;
