import React from "react";
import { useCalendar } from "./calendar.query";
import FullCalendar from "@fullcalendar/core";

const Calendar = () => {
  const { data, error } = useCalendar();

  if (error) {
    return <div>Error fetching calendar data</div>;
  } else {
    const calendar = new FullCalendar({
      plugins: ["interaction"],
    });

    // Add the calendar data to the calendar.
    data.events.forEach((event) => {
      calendar.addEvent(event);
    });

    return <FullCalendar events={data.events} />;
  }
};

export default Calendar;
