import "./appointmentPersonal.css";
import EmojiSelector from "../emojiSelector/EmojiSelector";

function AppointmentPersonal() {
  const handleEmojiChange = (emoji) => {
    console.log("Обрана емодзі:", emoji);
  };
  return (
    <div className="appointmentPersonalBody">
      <div className="appointmentPersonalHeader">
        <h1 className="clientName">Заяць Андрій</h1>
        <h1 className="appointmentPersonalTime">10:23-11:33</h1>
      </div>
      <div className="appointmentPersonalBottom">
        <div className="appointmentPersonalsComplains">
          <p className="coment">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est sit
            impedit animi rem earum sunt tempora. Distinctio incidunt voluptates
            repellendus beatae adipisci possimus quod labore maxime, vero
            architecto, neque doloremque.
          </p>
        </div>
        <div className="appointmentPersonalsEmoji">
          <EmojiSelector
            emojiKey="doctorEmoji"
            onEmojiChange={handleEmojiChange}
          />
        </div>
      </div>
    </div>
  );
}

export default AppointmentPersonal;
