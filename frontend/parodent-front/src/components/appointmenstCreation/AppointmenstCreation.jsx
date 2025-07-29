import React, { useState, useEffect } from "react";
import ManualTimeInput from "../timePicker/ManualTimeInput";
import "./appointmenstCreation.css";

import axios from "axios";

function AppointmentCreation({ onClose, onCreateAppointment, doctorName }) {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    notifications: true,
    comment: "",
    alergy: "",
    phone: "",
    doctor: "",
    complaints: "",
    timeData: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTimeSelect = (timeData) => {
    setFormData((prev) => ({ ...prev, timeData }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (onCreateAppointment) {
      await onCreateAppointment({
        ...formData,
        doctorName,
      });
    }
  };

  // const [doctors, setDoctors] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3000/api/doctors")
  //     .then((res) => setDoctors(res.data))
  //     .catch((err) => console.error(err));
  // }, []);

  return (
    <div className="appointmentCreationBody" onClick={onClose}>
      <div
        className="appointmentCreationContent"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit} className="appointmentCreationForm">
          <div className="appointmentCreationLeft">
            <ManualTimeInput onTimeSelect={handleTimeSelect} />
            <div className="appointmentInputContainer">
              <label>ПІБ</label>
              <input
                name="name"
                type="text"
                className="input"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="checkboxContainer">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleChange}
                />
                жінка
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                />
                чоловік
              </label>
              <label>
                <input
                  type="checkbox"
                  name="notifications"
                  checked={formData.notifications}
                  onChange={handleChange}
                />
                отримувати сповіщення
              </label>
            </div>

            <div className="appointmentInputContainer">
              <label>Коментар</label>
              <input
                name="comment"
                type="text"
                className="input"
                value={formData.comment}
                onChange={handleChange}
              />
            </div>
            <div className="appointmentInputContainer">
              <label>Алергія</label>
              <input
                name="alergy"
                type="text"
                className="input alergyInput"
                placeholder="*Обовязково"
                maxLength={13}
                value={formData.alergy}
                onChange={handleChange}
              />
            </div>

            <div className="contacts">
              <div className="appointmentInputContainer">
                <label>Телефон</label>
                <input
                  name="phone"
                  className="input"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>


              <div className="appointmentInputContainer">
                <label>Виберіть лікаря</label>
                {/* <select
                  name="source"
                  className="input"
                  value={formData.source}
                  onChange={handleChange}
                >
                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id} className="doctorsList" >
                      {doctor.name}
                    </option>
                  ))}
                </select> */}
              </div>
            </div>
          </div>

          <div className="appointmentCreationRight">
            <div className="appointmentInputContainer">
              <label>Скарги</label>
              <textarea
                name="complaints"
                className="textarea"
                value={formData.complaints}
                onChange={handleChange}
              />
            </div>
            <div className="appointmentCreationBtnContainer">
              <button type="submit" className="createAppointmentBTN">
                Створити запис
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AppointmentCreation;
