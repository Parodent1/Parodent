import React, { useState } from 'react';
import MobilePicker from 'react-mobile-picker-scroll';
import './navBar.css'
import { useAuth } from '../../context/AuthContext'

function NavBar() {
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

    const {user , isAuthenticated } = useAuth();

    return (
    <div className='navbarBody'>
        <div className="navLBtn">
            <button className="navBtn">всі пацієнти</button>
            <button className="navBtn">персонал</button>
            <button className="navBtn">календар</button>            
        </div>
        <div className="navRBtn">
            <button className="navBtn greenBtn" onClick={handlePopup}>створити запис</button>
            {isAuthenticated ? 
            <button className="navBtn">{user.firstname + ' ' + user.lastname}</button>
            :(
            <button className="navBtn">Guest</button>
            )}
            <div className="profileLogo"></div>
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
                  className='checkBox'
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
                  className='checkBox'
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
                  className='checkBox'
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
                onClick={() => {
                  console.log({
                    name,
                    gender,
                    notifications,
                    comment,
                    alergy,
                    phone,
                    source,
                    complaints,
                  });
                  setShowPopup(false);
                }}
              >
                Створити запис
              </button>
            </div>
          </div>
        </div>
      )}
        </div>
    </div>
)
}

export default NavBar