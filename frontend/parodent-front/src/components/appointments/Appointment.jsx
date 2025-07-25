import React, { useState } from "react";
import "./appointment.css";
import EmojiSelector from "../emojiSelector/EmojiSelector";

function Appointment({appointment}) {
  const handleEmojiChange = (emoji) => {
    console.log("Обрана емодзі:", emoji);
  };
  return (
    <div className="appointmentBody">
      <div className="appointmentHeader">
        <h1 className="clientName">{appointment.patientName}</h1>
        <h1 className="appointmentTime">{appointment.time}</h1>
      </div>
      <div className="appointmentsComplains">
        <p className="complaints">{appointment.comment || ''}</p>
        <p className="coment">{appointment.comment || ''}</p>
      </div>
      <div className="appointmentsEmoji">
        <EmojiSelector
          emojiKey="doctorEmoji"
          onEmojiChange={handleEmojiChange}
        />
      </div>
    </div>
  );
}

export default Appointment;