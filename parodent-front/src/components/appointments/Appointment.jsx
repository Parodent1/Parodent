import "./appointment.css";
import { useEffect, useRef, useState } from "react";
import { useShowAppointmentCreation } from "../../context/AppointmentCreationContext";
import { useAppointments } from "../../context/AppointmentContext";

function Appointment({ data }) {
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const emojiRef = useRef(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const editRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      // Закриття emoji
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setIsEmojiOpen(false);
      }
      // Закриття edit
      if (editRef.current && !editRef.current.contains(event.target)) {
        setIsEditOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [selectedEmoji, setSelectedEmoji] = useState("🩺");
  const { deleteAppointment } = useAppointments();
  const {
    showAppointmentCreation,
    setShowAppointmentCreation,
    setEditingAppointment,
  } = useShowAppointmentCreation();

  const toggleEditOpen = () => {
    setIsEditOpen((prev) => !prev);
  };

  const handleDelete = async () => {
    await deleteAppointment(data.id);
    setIsEditOpen(false);
  };

  const emojiList = [
    "🩺",
    "🧑‍⚕️",
    "👨‍⚕️",
    "👩‍⚕️",
    "💉",
    "🏥",
    "🩹",
    "🩻",
    "💊",
    "🧬",
    "🦠",
    "🩸",
    "🛌",
    "🧪",
    "🧫",
    "🩺",
    "🚑",
    "⚕️",
    "🧻",
    "🧴",
  ];

  const handleEmojiSelect = (emoji) => {
    setSelectedEmoji(emoji);
    setIsEmojiOpen(false);
  };

  return (
    <div className="allClinicAppointmentBody">
      <div className="leftGroup">
        <h1 className="clientName">{data.patientName}</h1>
        <h1 className="appointmentTime">
          {data.time}-{data.endTime}
        </h1>
        <div className="editButtonBox">
          <div
            className="emojiButton"
            onClick={() => setIsEmojiOpen((prev) => !prev)}
          >
            {selectedEmoji}
          </div>
          <span
            className="material-symbols-outlined"
            style={{ color: "#FF5858" }}
            onClick={toggleEditOpen}
          >
            more_vert
          </span>
        </div>
      </div>

      {isEmojiOpen && (
        <div className="selectEmojiBody" ref={emojiRef}>
          {emojiList.map((emoji) => (
            <button
              key={emoji}
              className="emojiButton"
              onClick={() => handleEmojiSelect(emoji)}
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

      {isEditOpen && (
        <div className="editModalBody" ref={editRef}>
          <button onClick={handleDelete} className="editBtn">
            <span
              className="material-symbols-outlined"
              style={{ color: "#FF5858" }}
            >
              delete
            </span>
            Delete
          </button>
          <button
            className="editBtn"
            onClick={() => {
              setEditingAppointment(data);
              setIsEditOpen(false);
              setShowAppointmentCreation(!showAppointmentCreation);
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{ color: "#FF5858" }}
            >
              edit
            </span>
            Edit
          </button>
        </div>
      )}

      <p className="coment">{data.comment}</p>
    </div>
  );
}

export default Appointment;
