import { useState } from "react";
import "./appointmentActionBtn.css";
import Calendar from "./calendar/Calendar";
import AppointmentCreation from "./appointmenstCreation/AppointmentsCreation";
import { useAppointmentTabs } from "../../../context/AppointmentTabsContext";
import { useAppointmentDate } from "../../../context/AppointmentDataContext";
import { useShowAppointmentCreation } from "../../../context/AppointmentCreationContext";

function AppointmentActionBtn() {
  const [showCalendar, setShowCalendar] = useState(false);
  const { selectedTab, setSelectedTab } = useAppointmentTabs();
  const { showAppointmentCreation, setShowAppointmentCreation } = useShowAppointmentCreation();

  const { selectedDate, setSelectedDate } = useAppointmentDate();

  const formatSelectedDate = () => {
  const dateObj = selectedDate instanceof Date ? selectedDate : new Date(selectedDate);
  const dayStr = String(dateObj.getDate()).padStart(2, "0");
  const monthStr = String(dateObj.getMonth() + 1).padStart(2, "0");
  return `${dayStr}.${monthStr}.${dateObj.getFullYear()}`;
};

const handleSelectSchedule = (e) => {
  setSelectedTab(e.target.value);
};

  const doctors = ["Дмитро Тодосюк", "Андрій Коваленко", "Наталія Сидоренко"];

  return (
    <div className="actionBtnBody">
      <div className="calendarContainerContent">
        <button
          className="ActionBtn"
          onClick={() => setShowCalendar(!showCalendar)}
        >
          <span className="material-symbols-outlined" style={{ color: "#FF5858" }}>
            calendar_month
          </span>
          {formatSelectedDate()}
        </button>

        {showCalendar && (
          <div className="calendarBox">
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
      <div className="rightGroup">
        <div className="ActionBtn">
          <span className="material-symbols-outlined" style={{ color: "#FF5858" }}>
            person
          </span>
          <select
            name="doctor"
            id="doctor"
            value={selectedTab}
            onChange={handleSelectSchedule}
            className="doctorSelectBtn"
          >
            <option value="allClinic">All clinic</option>
            {doctors.map((doctor, index) => (
              <option key={index} value={doctor}>
                {doctor}
              </option>
            ))}
          </select>
        </div>
        <div className="appointmentCreationContainer">
          <button
            className="ActionBtn"
            onClick={() => setShowAppointmentCreation(!showAppointmentCreation)}
          >
            <span className="material-symbols-outlined" style={{ color: "#FF5858" }}>
              add_circle
            </span>
            Create appointment
          </button>

          {showAppointmentCreation && (
            <div className="appointmentCreationBox">
              <AppointmentCreation setShowAppointmentCreation={setShowAppointmentCreation} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AppointmentActionBtn;
