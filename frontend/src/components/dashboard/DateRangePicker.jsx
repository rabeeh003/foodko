import React, { useState } from "react";
import { format, addMonths, subMonths } from "date-fns";
import "tailwindcss/tailwind.css";
import { Calendar } from "lucide-react";

const DateRangePicker = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [hoveredDate, setHoveredDate] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());

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

    const handlePrevMonth = () => {
        setCurrentMonth((prev) => subMonths(prev, 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth((prev) => addMonths(prev, 1));
    };

    const renderCalendar = () => {
        const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
        const startDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
        const daysArray = Array.from({ length: daysInMonth }, (_, i) => new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1));

        return (
            <div className="p-4 ">
                <div className="flex justify-between items-center mb-4">
                    <button onClick={handlePrevMonth} className="text-gray-600 hover:text-black">
                        &lt;
                    </button>
                    <span className="font-bold">
                        {format(currentMonth, "MMMM yyyy")}
                    </span>
                    <button onClick={handleNextMonth} className="text-gray-600 hover:text-black">
                        &gt;
                    </button>
                </div>
                <div className="grid grid-cols-7 gap-2">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                        <div key={day} className="text-center font-medium">
                            {day}
                        </div>
                    ))}
                    {Array.from({ length: startDay }, (_, i) => (
                        <div key={`empty-${i}`} />
                    ))}
                    {daysArray.map((date) => (
                        <button
                            key={date}
                            onClick={() => handleDateClick(date)}
                            onMouseEnter={() => setHoveredDate(date)}
                            className={`py-1 rounded-md ${startDate && endDate && date >= startDate && date <= endDate
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
            </div>
        );
    };

    return (
        <div className="relative">
            <button
                onClick={toggleCalendar}
                className="px-2 sm:px-6 py-2 border rounded-lg bg-backgroundPrimary flex gap-4 items-center hover:bg-backgroundSecondary focus:outline-none"
            >
                <span className='bg-blue-100 text-blue-500 rounded-lg p-2'>
                    <Calendar size={19} />
                </span>
                <span className="hidden sm:block text-start">
                    Filter periode
                    <p className="text-[10px] font-thin"> {startDate ? format(startDate, "MM/dd/yyyy") : "Start Date"} -{" "}
                        {endDate ? format(endDate, "MM/dd/yyyy") : "End Date"}</p>
                </span>
            </button>

            {isCalendarOpen && (
                <div className="absolute w-[300px] right-0 mt-2 z-10 bg-backgroundPrimary border p-2 rounded-lg shadow-lg">
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
