import { useState , useEffect, useCallback} from "react";
import "./appointmenstCreation.css";
import TimeInput from "./timeInput/TimeInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faComment } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import dayjs from "dayjs";
import { useAppointments } from "../../../../context/AppointmentContext";
import { useShowAppointmentCreation } from "../../../../context/AppointmentCreationContext";

function AppointmentCreation({
}) {
  const [formData, setFormData] = useState({
    name: "",
    comment: "",
    doctor: "",
    timeData: null,
  });

  const {setShowAppointmentCreation, editingAppointment, setEditingAppointment } = useShowAppointmentCreation();

  const [doctors, setDoctors] = useState([]);

  const { fetchAppointments } = useAppointments();

  useEffect(() => {
    const fetchDoctors = async() => {
      try {
        const res = await axios.get("http://localhost:3000/apiDoctor/allDoctors");
        setDoctors(res.data);
      } catch (error) {
        console.error("Failed to fetch doctors", error);
      }
    };
  
    fetchDoctors();
  }, [])

  useEffect(() => {
    if (editingAppointment) {
      setFormData({
        name: editingAppointment.patientName,
        comment: editingAppointment.comment,
        doctor: {
          name: editingAppointment.doctorName,
          cabinetNumber: editingAppointment.cabinet,
        },
        timeData: {
          startTime: editingAppointment.time,
          duration: editingAppointment.duration,
          date: new Date(editingAppointment.date),
        }
      });
    }
  }, [editingAppointment]);

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
  
    const payload = {
      patientName: formData.name,
      comment: formData.comment,
      cabinet: formData.doctor.cabinetNumber,
      doctorName: formData.doctor.name,
      time: formData.timeData.startTime,
      duration: formData.timeData.duration,
      date: dayjs(formData.timeData.date).format("YYYY-MM-DD"),
    };
  
    try {
      if (editingAppointment) {
        await axios.put(
          `http://localhost:3000/apiAppointment/appointment/${editingAppointment.id}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await axios.post(`http://localhost:3000/apiAppointment/createapp`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
  
      fetchAppointments();
      setShowAppointmentCreation(false);
      setEditingAppointment(null);
    } catch (error) {
      console.log("Error submitting form:", error);
    }
  };

  return (
    <div
      className="appointmentModalOverlay"
      onClick={() => {
        setShowAppointmentCreation(false);
        setEditingAppointment(null);
      }}
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
            <FontAwesomeIcon icon={faUser} style={{ color: "#FF5858" }}/>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Write patient name..."
              className="input"
              value={formData.name}
              onChange={handleChange}
              required={!editingAppointment}
            />
          </div>

          <div className="flex-column">
            <label>Comment</label>
          </div>
          <div className="inputForm">
            <FontAwesomeIcon icon={faComment} style={{ color: "#FF5858" }}/>
            <input
              id="comment"
              name="comment"
              type="text"
              placeholder="Write a comment..."
              className="input"
              value={formData.comment}
              onChange={handleChange}
              required={!editingAppointment}
            />
          </div>

            <TimeInput 
            onTimeSelect={handleTimeSelect}
            onDoctorSelect={handleDoctorSelect}
            selectedDoctor={formData.doctor}
            doctors={doctors} />

          <button type="submit" className="button-submit">
            Створити запис
          </button>
        </form>
      </div>
    </div>
  );
}

export default AppointmentCreation;
