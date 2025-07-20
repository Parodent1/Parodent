import React, { useState } from "react";
import "./appointment.css";
import EmojiSelector from "../emojiSelector/EmojiSelector";

function Appointment() {
  const handleEmojiChange = (emoji) => {
    console.log("Обрана емодзі:", emoji);
  };
  return (
    <div className="appointmentBody">
      <div className="appointmentHeader">
        <h1 className="clientName">Заяць Данило Ігорович</h1>
        <h1 className="appointmentTime">11:23–12:39</h1>
      </div>
      <div className="appointmentsComplains">
        <p className="complaints">Біль в 8 зубі</p>
        <p className="coment">агресивний пацієнт </p>
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