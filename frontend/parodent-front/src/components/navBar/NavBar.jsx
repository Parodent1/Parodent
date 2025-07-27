import React, { useMemo, useState } from "react";
import "./navBar.css";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";

function NavBar() {
    const today = new Date();

    const [selectedDay, setSelectedDay] = useState(today.getDate());
    const [month, setMonth] = useState(today.getMonth());
    const [year, setYear] = useState(today.getFullYear());
  
    const [showCalendar, setShowCalendar] = useState(false);
    const handleCalendar = () => setShowCalendar(!showCalendar);
  
    const getDaysInMonth = (year, month) => {
      return new Date(year, month + 1, 0).getDate();
    };
  
    const daysArray = useMemo(() => {
      const daysInMonth = getDaysInMonth(year, month);
      return Array.from({ length: daysInMonth }, (_, i) => i + 1);
    }, [month, year]);
  
    const formatSelectedDate = () => {
      const dayStr = String(selectedDay).padStart(2, "0");
      const monthStr = String(month + 1).padStart(2, "0");
      return `${dayStr}.${monthStr}.${year}`;
    };
  
  const [showPopup, setShowPopup] = useState(false);
  const handlePopup = () => setShowPopup(!showPopup);

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [notifications, setNotifications] = useState(true);
  const [comment, setComment] = useState("");
  const [alergy, setAlergy] = useState("");
  const [phone, setPhone] = useState("");
  const [source, setSource] = useState("");
  const [complaints, setComplaints] = useState("");

  const { user, isAuthenticated } = useAuth();

  const handleCreateAppointment = async () => {
    const token = localStorage.getItem("token");
    const appointmentData = {
      date: "2025-07-26",
      time: "10:00",
      patientName: name,
      cabinet: 1,
      comment,
      doctorName: user?.firstname + " " + user?.lastname,
    };
    try {
      const res = await axios.post(
        "http://localhost:3000/api/createapp",
        appointmentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Appointment created:", res.data);
      setShowPopup(false);
    } catch (error) {
      console.error("Failed to create appointment:", error);
    }
  };

  return (
    <div className="navbarBody">
      <div className="navLBtn">
        <Link className="navBtn" to='/monthlySchedule'>календар</Link>
        <Link className="navBtn" to='/allStuff'>персонал</Link>
        <Link className="navBtn" to='/monthlySchedule'>всі пацієнти</Link>
      </div>
      <div className="navCBtn">
        <button className="navBtn" onClick={handleCalendar}>
        {selectedDay && <p>{formatSelectedDate()}</p>}
        </button>
      </div>
      <div className="navRBtn">
        <button className="navBtn greenBtn" onClick={handlePopup}>
          створити запис
        </button>
        {isAuthenticated ? (
          <button className="navBtn">
            {user.firstname + " " + user.lastname}
          </button>
        ) : (
          <button className="navBtn">Guest</button>
        )}
        <div className="profileLogo"></div>
        {showCalendar && (
          <div className="calendarBody" onClick={() => setShowCalendar(false)}>
            <div
              className="calendarContent"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="calendar">
                <div className="calendarHeader">
                  <button onClick={() => setMonth(month - 1)}>&lt;</button>
                  <h2>
                    {new Date(year, month).toLocaleString("uk-UA", {
                      month: "long",
                      year: "numeric",
                    })}
                  </h2>
                  <button onClick={() => setMonth(month + 1)}>&gt;</button>
                </div>
                <div className="calendarGrid">
                  {daysArray.map((day) => (
                    <div
  key={day}
  className={`calendarDay ${selectedDay === day ? "selected" : ""}`}
  onClick={() => {
    setSelectedDay(day);
    setShowCalendar(false);
  }}
>
  {day}
</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {showPopup && (
          <div
            className="appointmentCreationBody"
            onClick={() => setShowPopup(false)}
          >
            <div
              className="appointmentCreationContent"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="appointmentCreationLeft">
                <input
                  type="text"
                  placeholder="ПІБ"
                  className="PIB"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <div className="dateButton">
                  <button className="day">День</button>
                  <button className="time">Час</button>
                  <button className="doctor">Лікар</button>
                </div>

                <div className="checkboxContainer">
                  <label>
                    <input
                      className="checkBox"
                      type="radio"
                      name="option"
                      value="1"
                      checked={gender === "1"}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    жінка
                  </label>
                  <label>
                    <input
                      className="checkBox"
                      type="radio"
                      name="option"
                      value="2"
                      checked={gender === "2"}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    чоловік
                  </label>
                  <label>
                    <input
                      className="checkBox"
                      type="checkbox"
                      name="notifications"
                      checked={notifications}
                      onChange={() => setNotifications(!notifications)}
                    />
                    отримувати сповіщення
                  </label>
                </div>

                <div className="birthContainer">
                  <button className="birthday">День</button>
                  <button className="month">Місяць</button>
                  <button className="year">Рік</button>
                </div>

                <input
                  type="text"
                  placeholder="Коментар"
                  className="appointmentComent"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />

                <input
                  type="text"
                  placeholder="Алергія"
                  className="alergy"
                  value={alergy}
                  onChange={(e) => setAlergy(e.target.value)}
                />

                <div className="contacts">
                  <input
                    type="tel"
                    name="phonenumber"
                    placeholder="+38 (063) 272 50 59"
                    className="number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />

                  <input
                    type="text"
                    placeholder="Звідки дізнався"
                    className="stat"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                  />
                </div>
              </div>

              <div className="appointmentCreationRight">
                <textarea
                  placeholder="Скарги"
                  value={complaints}
                  onChange={(e) => setComplaints(e.target.value)}
                />
                <button
                  className="createAppointmentBTN"
                  onClick={handleCreateAppointment}
                >
                  Створити запис
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
