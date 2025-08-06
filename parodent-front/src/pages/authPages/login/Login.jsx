import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import logo from '../../../assets/logo.png'
import { useAuth } from "../../../context/AuthContext";
import axios from "axios";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [ formData, setFormData ] = useState({email: "", password: ""})
  const [ error, setError ] = useState("")
  const navigate = useNavigate()

  const {isAuthenticated , checkAuth} = useAuth();

  useEffect(() => {
    if(isAuthenticated) {
      navigate('/appointments')
    }
  }, [isAuthenticated])
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try{
      const res = await axios.post("http://localhost:3000/apiDoctor/login", {
        email: formData.email,
        password: formData.password
      })
      const {token, doctor } = res.data

      console.log("✅ JWT Token:", token);

      localStorage.setItem("token", token)

      await checkAuth()
      navigate("/appointments")
    } catch (err) {
      setError(err.response?.data?.message || "login Failed")
    }
  }
  return (
    <div className="loginBody">
      <div className="logincontent">
        <form className="loginForm" onSubmit={handleSubmit}>
                  <div className="loginLogo">
                    <img src={logo} alt="loginLogo"/>
                    <h1>Parodent</h1>
                  </div>
          <div className="flex-column">
            <label>Email</label>
          </div>
          <div className="inputForm">
            <span class="material-symbols-outlined">alternate_email</span>
            <input
              type="email"
              className="input"
              name="email"
              onChange={handleChange}
              placeholder="Enter your Email"
              value={formData.email}
              required
            />
          </div>

          <div className="flex-column">
            <label>Password</label>
          </div>
          <div className="inputForm">
            <span class="material-symbols-outlined">lock</span>
            <input
              type={showPassword ? "text" : "password"}
              className="input"
              name="password"
              onChange={handleChange}
              placeholder="Enter your Password"
              value={formData.password}
              required
            />
            <button
              type="button"
              className="togglePasswordBtn"
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </button>
          </div>

          <div className="flex-row">
            <div>
              <input type="checkbox" />
              <label>Remember me</label>
            </div>
            <span className="span">Forgot password?</span>
          </div>

          <button className="button-submit">Sign In</button>
          <p className="p">
            <button className="btn google">
              <FontAwesomeIcon icon={faGoogle} />
              Log in with Google
            </button>
          </p>
          <div className="flex-row"></div>
        </form>
      </div>
    </div>
  );
}

export default Login;
