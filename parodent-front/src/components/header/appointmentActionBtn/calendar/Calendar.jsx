import React, { useState, useMemo } from "react";
import "./calendar.css";

function Calendar({ setShowCalendar, onDateSelect, initialDate }) {
  const today = initialDate || new Date();

  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const daysArray = useMemo(() => {
    const daysInMonth = getDaysInMonth(year, month);
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  }, [month, year]);

  const handleMonthChange = (change) => {
    const newMonth = month + change;
    if (newMonth < 0) {
      setMonth(11);
      setYear(year - 1);
    } else if (newMonth > 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(newMonth);
    }
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
    if (onDateSelect) {
      onDateSelect(day, month, year);
    }
    setShowCalendar(false);
  };

  // 👇 Закриває календар тільки коли клік по фону
  const handleBackgroundClick = (e) => {
    if (e.target.classList.contains("calendarBody")) {
      setShowCalendar(false);
    }
  };

  return (
    <div className="calendarBody" onClick={handleBackgroundClick}>
      <div className="calendarContent">
        <div className="calendarHeader">
          <button onClick={() => handleMonthChange(-1)}>
            <span
              className="material-symbols-outlined"
              style={{ color: "#FF5858", cursor: "pointer" }}
            >
              arrow_back_ios
            </span>
          </button>
          <h2>
            {new Date(year, month).toLocaleString("uk-UA", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <button onClick={() => handleMonthChange(1)}>
            <span
              className="material-symbols-outlined"
              style={{ color: "#FF5858", cursor: "pointer" }}
            >
              arrow_forward_ios
            </span>
          </button>
        </div>
        <div className="calendarGrid">
          {daysArray.map((day) => (
            <div
              key={day}
              className={`calendarDay ${selectedDay === day ? "selected" : ""}`}
              onClick={() => handleDayClick(day)}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
