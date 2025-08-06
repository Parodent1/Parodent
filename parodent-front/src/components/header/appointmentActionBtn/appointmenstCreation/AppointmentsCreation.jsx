import { useState, useEffect, useCallback } from "react";
import "./appointmenstCreation.css";
import TimeInput from "./timeInput/TimeInput";
import axios from "axios";
import dayjs from "dayjs";
import { useAppointments } from "../../../../context/AppointmentContext";

function AppointmentCreation({ setShowAppointmentCreation }) {
  const [formData, setFormData] = useState({
    name: "",
    comment: "",
    doctor: "",
    timeData: null,
  });

  const [doctors, setDoctors] = useState([]);

  const { fetchAppointments } = useAppointments();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/apiDoctor/allDoctors"
        );
        setDoctors(res.data);
      } catch (error) {
        console.error("Failed to fetch doctors", error);
      }
    };

    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTimeSelect = useCallback((timeData) => {
    setFormData((prev) => ({ ...prev, timeData }));
  }, []);

  const handleDoctorSelect = (doctor) => {
    setFormData((prev) => ({ ...prev, doctor }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.timeData || !formData.doctor) {
      alert("Please select time and doctor.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Not authenticated");
      return;
    }
    try {
      const payload = {
        patientName: formData.name,
        comment: formData.comment,
        cabinet: formData.doctor.cabinetNumber,
        doctorName: formData.doctor.name,
        time: formData.timeData.startTime,
        duration: formData.timeData.duration,
        date: dayjs(formData.timeData.date).format("YYYY-MM-DD"),
      };
      console.log(payload);
      const res = await axios.post(
        "http://localhost:3000/apiAppointment/createapp",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchAppointments();
      setShowAppointmentCreation(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="appointmentModalOverlay"
      onClick={() => setShowAppointmentCreation(false)}
    >
      <div
        className="appointmentModalContent"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit} className="appointmentForm">
          <div className="flex-column">
            <label>Full Name</label>
          </div>
          <div className="inputForm">
            <span
              class="material-symbols-outlined"
              style={{ color: "#FF5858" }}
            >
              person
            </span>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Write patient name..."
              className="input"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex-column">
            <label>Comment</label>
          </div>
          <div className="inputForm">
            <span
              class="material-symbols-outlined"
              style={{ color: "#FF5858" }}
            >
              comment
            </span>
            <input
              id="comment"
              name="comment"
              type="text"
              placeholder="Write a comment..."
              className="input"
              value={formData.comment}
              onChange={handleChange}
              required
            />
          </div>

          <TimeInput
            onTimeSelect={handleTimeSelect}
            onDoctorSelect={handleDoctorSelect}
            selectedDoctor={formData.doctor}
            doctors={doctors}
          />

          <button type="submit" className="button-submit">
            Створити запис
          </button>
        </form>
      </div>
    </div>
  );
}

export default AppointmentCreation;
