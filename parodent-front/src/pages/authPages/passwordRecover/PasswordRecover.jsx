import logo from "../../../assets/logo.png";
import "./passwordRecover.css";

function PasswordRecover() {
  return (
    <div className="passwordRecoverBody">
      <div className="passwordRecoverContent">
        <form className="loginForm">
          <div className="loginLogo">
            <img src={logo} alt="loginLogo" />
            <h1>Parodent</h1>
          </div>
          <div className="flex-column">
            <label>Email</label>
            <p>Enter your email address and we'll send you a link to reset your password. </p>
          </div>
          <div className="inputForm">
            <span class="material-symbols-outlined">alternate_email</span>
            <input
              type="email"
              className="input"
              name="email"
              placeholder="Enter your Email"
              required
            />
          </div>
          <button className="button-submit">Send E-mail</button>
          <button className="btn google">
            Back to login
          </button>
        </form>
      </div>
    </div>
  );
}

export default PasswordRecover;
