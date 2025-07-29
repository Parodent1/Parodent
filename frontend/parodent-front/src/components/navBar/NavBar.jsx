import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import Calendar from "../calendar/Calendar";
import AppointmentCreation from "../../components/appointmenstCreation/AppointmenstCreation";
import "./navBar.css";

function NavBar() {
  const { user, isAuthenticated } = useAuth();
  const [showCalendar, setShowCalendar] = useState(false);
  const [showAppointmentCreation, setShowAppointmentCreation] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const formatSelectedDate = () => {
    const dayStr = String(selectedDate.getDate()).padStart(2, "0");
    const monthStr = String(selectedDate.getMonth() + 1).padStart(2, "0");
    return `${dayStr}.${monthStr}.${selectedDate.getFullYear()}`;
  };

  const handleCreateAppointment = async (formData) => {
    try {
      const token = localStorage.getItem("token");
      const appointmentData = {
        date: selectedDate.toISOString().split("T")[0],
        time: formData.timeData?.startTime || "10:00",
        patientName: formData.name,
        cabinet: 1,
        comment: formData.comment,
        doctorName: user?.firstname + " " + user?.lastname,
      };

      const res = await axios.post(
        "http://localhost:3000/api/createapp",
        appointmentData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Appointment created:", res.data);
      setShowAppointmentCreation(false);
    } catch (error) {
      console.error("Failed to create appointment:", error);
    }
  };

  return (
    <div className="navbarBody">
      <div className="navbarContent">
        <div className="navLBtn">
          <Link className="navBtn" to="/monthlySchedule">
            Календар
          </Link>
          <Link className="navBtn" to="/allStuff">
            Персонал
          </Link>
          <Link className="navBtn" to="/monthlySchedule">
            Всі пацієнти
          </Link>
        </div>

        <div className="navCBtn">
          <button
            className="navBtn navCalendarBtn"
            onClick={() => setShowCalendar(!showCalendar)}
          >
            {formatSelectedDate()}
          </button>
          {showCalendar && (
            <div className="navCalendarCover">
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

        <div className="navRBtn">
          <button
            className="navBtn greenBtn"
            onClick={() => setShowAppointmentCreation(true)}
          >
            Створити запис
          </button>

          {isAuthenticated ? (
            <button className="navBtn">
              {user.firstname + " " + user.lastname}
            </button>
          ) : (
            <button className="navBtn">Гість</button>
          )}

          <div className="profileLogo"></div>

          {showAppointmentCreation && (
            <AppointmentCreation
              onClose={() => setShowAppointmentCreation(false)}
              onCreateAppointment={handleCreateAppointment}
              doctorName={user?.firstname + " " + user?.lastname}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
