import "./appointment.css";
import EmojiSelector from "../emojiSelector/EmojiSelector";
import { useState } from "react";
import { useShowAppointmentCreation } from "../../context/AppointmentCreationContext";

function Appointment({ data }) {
  const [editModal, setEditModal] = useState(false);

  const { showAppointmentCreation, setShowAppointmentCreation } =
    useShowAppointmentCreation();

  const hadleEditModal = () => {
    setEditModal(!editModal);
  };
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
        <div className="editButtonBox">
          <span
            class="material-symbols-outlined"
            style={{ color: "#FF5858" }}
            onClick={hadleEditModal}
          >
            more_vert
          </span>
          {editModal && (
            <div
              className="editModalOverlay"
              onClick={() => setEditModal(false)}
            >
              <div
                className="editModalBody"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="ActionBtn"
                  onClick={() => {
                    setEditModal(false);
                    // setShowAppointmentCreation(!showAppointmentCreation);
                  }}
                >
                  {" "}
                  <span
                    class="material-symbols-outlined"
                    style={{ color: "#FF5858" }}
                  >
                    delete
                  </span>
                  Delete
                </button>
                <button
                  className="ActionBtn"
                  onClick={() => {
                    setEditModal(false);
                    setShowAppointmentCreation(!showAppointmentCreation);
                  }}
                >
                  {" "}
                  <span
                    class="material-symbols-outlined"
                    style={{ color: "#FF5858" }}
                  >
                    edit
                  </span>
                  Edit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="appointmentsEmoji">
        <EmojiSelector className="emojiIcon" emojiKey="doctorEmoji" />
      </div>
    </div>
  );
}

export default Appointment;
