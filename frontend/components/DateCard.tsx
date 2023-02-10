import React, { useState, useEffect } from "react";
import date from "date-and-time";

const DateCard = ({ date: celebrationDate }: { date: string }) => {
  const [weekday, setWeekday] = useState("Mon");
  const [month, setMonth] = useState("Jan");
  const [dayNumber, setDayNumber] = useState("1");
  useEffect(() => {
    // Replace the years input with current year
    // TODO - programatically add current year instead of hardcode 2023
    const currentYearDate = celebrationDate?.replace(/^.{4}/g, "2023");
    const formattedDate = date.format(
      new Date(currentYearDate),
      "ddd, MMM DD YYYY"
    );
    const dateValuesArr = formattedDate.split(" ");
    setMonth(dateValuesArr[1]);
    setDayNumber(dateValuesArr[2]);
    setWeekday(formattedDate.substring(0, 3));
  }, []);

  return (
    <div className="dateCard">
      <p>{weekday}</p>
      <p className="text-lg font-black">{dayNumber}</p>
      <p>{month}</p>
    </div>
  );
};

export default DateCard;
