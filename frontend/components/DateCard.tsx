import React from "react";
import date from "date-and-time";

const DateCard = ({ date: celebrationDate }: { date: string }) => {
  const currentYearDate = celebrationDate.replace(/^.{4}/g, "2023");
  const formattedDate = date.format(
    new Date(currentYearDate),
    "ddd,MMM DD YYYY"
  );
  console.log(formattedDate);
  return (
    <div className="dateCard">
      <p>{celebrationDate}</p>
      <p>Sun</p>
      <p className="text-lg font-black">15</p>
      <p>Jan</p>
    </div>
  );
};

export default DateCard;
