import React, { useState } from "react";
import "./manualTimeInput.css";
import Calendar from "../calendar/Calendar";

function ManualTimeInput({ onTimeSelect }) {
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (startTime && duration) {
      console.log("Час початку:", startTime);
      console.log("Тривалість:", duration, "хв");

      // Pass the selected time back to parent component
      if (onTimeSelect) {
        onTimeSelect({
          startTime,
          duration: parseInt(duration),
        });
      }
    }
  };

  const [selectedDate, setSelectedDate] = useState(new Date());

  const formatSelectedDate = () => {
    const dayStr = String(selectedDate.getDate()).padStart(2, "0");
    const monthStr = String(selectedDate.getMonth() + 1).padStart(2, "0");
    return `${dayStr}.${monthStr}.${selectedDate.getFullYear()}`;
  };

  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <form onSubmit={handleSubmit} className="manualTimeForm">
      {/* Date Picker Field */}
      <div className="formField dateFormField">
        <label>Дата</label>
        <button
          type="button"
          className="input dateInput"
          onClick={() => setShowCalendar(!showCalendar)}
        >
          {formatSelectedDate()}
        </button>

        {showCalendar && (
          <div className="timeCalendarCover">
            <Calendar
              setShowCalendar={setShowCalendar}
              onDateSelect={(day, month, year) => {
                setSelectedDate(new Date(year, month, day));
                setShowCalendar(false);
              }}
            />
          </div>
        )}

      </div>
      

      {/* Start Time Field */}
      <div className="formField">
        <label>Час початку</label>
        <input
          type="time"
          className="input"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
      </div>

      {/* Duration Field */}
      <div className="formField">
        <label>Тривалість (хв)</label>
        <input
        placeholder="--"
          className="input"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />
      </div>
    </form>
  );
}

export default ManualTimeInput;
