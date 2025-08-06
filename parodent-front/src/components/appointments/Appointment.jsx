import "./appointment.css";
import EmojiSelector from '../emojiSelector/EmojiSelector'

function Appointment({data}) {
  const handleEmojiChange = (emoji) => {
    console.log("Обрана емодзі:", emoji);
  };
  return (
    <div className="allClinicAppointmentBody">
      <div className="appointmentHeader">
        <h1 className="clientName">{data.patientName}</h1>
        <h1 className="appointmentTime">{data.time}-{data.endTime}</h1>
      </div>
      <div className="appointmentBottom">
      <div className="appointmentsComments">
        <p className="coment">{data.comment}</p>
      </div>
      <div className="appointmentsEmoji">
        <EmojiSelector
          emojiKey="doctorEmoji"
          onEmojiChange={handleEmojiChange}
        />
      </div>
      </div>
    </div>
    // <div className="appointmentBody">
    //   <div className="appointmentHeader">
    //     <h1 className="clientName">{appointment.patientName}</h1>
    //     <h1 className="appointmentTime">{appointment.time}</h1>
    //   </div>
    //   <div className="appointmentsComplains">
    //     <p className="complaints">{appointment.comment || ''}</p>
    //     <p className="coment">{appointment.comment || ''}</p>
    //   </div>
    //   <div className="appointmentsEmoji">
    //     <EmojiSelector
    //       emojiKey="doctorEmoji"
    //       onEmojiChange={handleEmojiChange}
    //     />
    //   </div>
    // </div>
  );
}

export default Appointment;