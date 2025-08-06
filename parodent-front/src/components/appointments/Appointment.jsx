import "./appointment.css";
import EmojiSelector from "../emojiSelector/EmojiSelector";
import { useState, useEffect } from "react";
import { useShowAppointmentCreation } from "../../context/AppointmentCreationContext";

function Appointment({ data }) {
  const [editModal, setEditModal] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("🙂");
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);

  const { showAppointmentCreation, setShowAppointmentCreation } =
    useShowAppointmentCreation();

  const hadleEditModal = () => {
    setEditModal(!editModal);
  };

  useEffect(() => {
    const savedEmoji = localStorage.getItem("doctorEmoji");
    if (savedEmoji) {
      setSelectedEmoji(savedEmoji);
    }
  }, []);

  return (
    <div className="allClinicAppointmentBody">
      <div className="appointmentHeader">
        <h1 className="clientName">{data.patientName}</h1>
        <h1 className="appointmentTime">
          {data.time}-{data.endTime}
        </h1>
      </div>
      <div className="appointmentBottom">
        <div className="appointmentsComments">
          <p className="coment">{data.comment}</p>
        </div>
        <div className="ButtonBox">
          <button
            className="emojiToggleBtn"
            onClick={() => setIsEmojiOpen(!isEmojiOpen)}
          >
            {selectedEmoji}
          </button>
          <button className="editToggleBtn">
            <span
              className="material-symbols-outlined"
              style={{ color: "#FF5858" }}
              onClick={hadleEditModal}
            >
              more_vert
            </span>
          </button>
        </div>
      </div>
      {editModal && (
        <div className="editModalOverlay" onClick={() => setEditModal(false)}>
          <div className="editModalBody" onClick={(e) => e.stopPropagation()}>
            <button
              className="editBtn"
              onClick={() => {
                setEditModal(false);
              }}
            >
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
                setEditModal(false);
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
        </div>
      )}
      <div className="emojiContainer">
        <EmojiSelector
          emojiKey="doctorEmoji"
          isOpen={isEmojiOpen}
          setIsOpen={setIsEmojiOpen}
          onEmojiChange={(emoji) => setSelectedEmoji(emoji)}
        />
      </div>
    </div>
  );
}

export default Appointment;
