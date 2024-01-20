import React, { useState, useEffect } from "react";
import date from "date-and-time";
import { formatCurrentYearDate } from "../util/dateHelper";

const DateCard = ({ date: celebrationDate }: { date: string }) => {
    const [weekday, setWeekday] = useState("Mon");
    const [month, setMonth] = useState("Jan");
    const [dayNumber, setDayNumber] = useState("1");
    useEffect(() => {
        const currentYearDate = formatCurrentYearDate(celebrationDate)
        const formattedDate = date.format(
            new Date(currentYearDate),
            "ddd, MMM DD YYYY",
            true
        );
        const dateValuesArr = formattedDate.split(" ");
        setMonth(dateValuesArr[1]);
        setDayNumber(dateValuesArr[2]);
        setWeekday(formattedDate.substring(0, 3));
    }, [celebrationDate]);

    return (
        <div className="dateCard">
            <p>{weekday}</p>
            <p className="text-lg font-black">{dayNumber}</p>
            <p>{month}</p>
        </div>
    );
};

export default DateCard;
