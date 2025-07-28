import React, { useState, useMemo } from 'react';
import './calendar.css'

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
        } else {
            setShowCalendar(false);
        }
    };

    return (
        <div className="calendarBody" onClick={() => setShowCalendar(false)}>
            <div className="calendarContent" onClick={(e) => e.stopPropagation()}>
                <div className="calendar">
                    <div className="calendarHeader">
                        <button onClick={() => handleMonthChange(-1)}>&lt;</button>
                        <h2>
                            {new Date(year, month).toLocaleString("uk-UA", {
                                month: "long",
                                year: "numeric",
                            })}
                        </h2>
                        <button onClick={() => handleMonthChange(1)}>&gt;</button>
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
        </div>
    );
}

export default Calendar;