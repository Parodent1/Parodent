import { useState, useEffect } from "react";
import "./timeInput.css";
import Calendar from "../../calendar/Calendar"; // не забудь, якщо використовуєш календар
import axios from "axios";
import { useShowAppointmentCreation } from "../../../../../context/AppointmentCreationContext";

function TimeInput({ onTimeSelect, doctors, selectedDoctor, onDoctorSelect }) {
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  
  const { editingAppointment } = useShowAppointmentCreation()

  useEffect(() => {
    if (startTime && duration && selectedDate) {
      onTimeSelect({
        startTime,
        duration: parseInt(duration),
        date: selectedDate,
      });
    }
  }, [startTime, duration, selectedDate, onTimeSelect]);

  const formatSelectedDate = () => {
    const dayStr = String(selectedDate.getDate()).padStart(2, "0");
    const monthStr = String(selectedDate.getMonth() + 1).padStart(2, "0");
    return `${dayStr}.${monthStr}.${selectedDate.getFullYear()}`;
  };

  return (
    <div className="manualTimeForm">
      <div className="coolinput">
        <label className="text">Date</label>
        <button
          type="button"
          className="dateInput"
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

      <div className="coolinput">
        <label className="text">Start time</label>
        <input
          type="time"
          className="dateInput"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required={!editingAppointment}
        />
      </div>

      <div className="coolinput">
        <label className="text">Duration (min)</label>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="--"
          className="dateInput"
          value={duration}
          onChange={(e) => {
            const onlyNumbers = e.target.value.replace(/\D/g, "");
            setDuration(onlyNumbers);
          }}
          required={!editingAppointment}
        />
      </div>

      <div className="coolinput">
        <label className="text">Choose doctor</label>
          <select
            name="doctor"
            id="doctor"
            value={selectedDoctor?.id || ""}
            onChange={(e) => {
              const selected = doctors.find((doc) => doc.id === e.target.value)
              if(selected){
                onDoctorSelect(selected)
              }
              }
            }    
            className="dateInput"
          >
            <option value="">Choose doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name} (Кабінет {doctor.cabinetNumber})
              </option>
            ))}
          </select>
      </div>
    </div>
  );
}

export default TimeInput;
