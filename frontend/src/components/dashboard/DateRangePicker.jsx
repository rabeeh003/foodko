import React, { useState } from "react";
import { format } from "date-fns";
import "tailwindcss/tailwind.css";

const DateRangePicker = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [hoveredDate, setHoveredDate] = useState(null);

  const toggleCalendar = () => setIsCalendarOpen(!isCalendarOpen);

  const handleDateClick = (date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else if (startDate && !endDate) {
      setEndDate(date < startDate ? startDate : date);
      setStartDate(date < startDate ? date : startDate);
    }
  };

  const renderCalendar = () => {
    const today = new Date();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => new Date(today.getFullYear(), today.getMonth(), i + 1));

    return (
      <div className="grid grid-cols-7 gap-2 p-4 border">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div key={day} className="text-center font-medium">
            {day}
          </div>
        ))}
        {daysArray.map((date) => (
          <button
            key={date}
            onClick={() => handleDateClick(date)}
            onMouseEnter={() => setHoveredDate(date)}
            className={`py-1 rounded-md ${
              startDate && endDate && date >= startDate && date <= endDate
                ? "bg-blue-500 text-white"
                : startDate && date.getTime() === startDate.getTime()
                ? "bg-green-500 text-white"
                : endDate && date.getTime() === endDate.getTime()
                ? "bg-red-500 text-white"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {date.getDate()}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="relative">
      <button
        onClick={toggleCalendar}
        className="px-4 py-2 border rounded-lg bg-backgroundPrimary hover:bg-backgroundSecondary focus:outline-none"
      >
        {startDate ? format(startDate, "MM/dd/yyyy") : "Start Date"} -{" "}
        {endDate ? format(endDate, "MM/dd/yyyy") : "End Date"}
      </button>

      {isCalendarOpen && (
        <div className="absolute mt-2 z-10 bg-backgroundPrimary">
          {renderCalendar()}
          <div className="flex justify-end mt-2">
            <button
              onClick={() => setIsCalendarOpen(false)}
              className="text-blue-500 hover:text-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
