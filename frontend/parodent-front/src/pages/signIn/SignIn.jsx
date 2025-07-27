import React, { useState, useEffect } from "react";

import "../signUp/SignUp.css";
import LogoSignIn from '../../components/logoSing/LogoSignIn'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    surname: "",
  });

  const { checkAuth, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/schedule");
    }
  }, [isAuthenticated]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        email: formData.email,
        password: formData.password,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);
      console.log("Login successful! Token:", token);

      await checkAuth();
      navigate("/schedule");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="body">
      <div className="content">
        <div className="logoContainer">
          <LogoSignIn />
        </div>
        <div className="signUpInputContainer">
          <h1>вхід</h1>
          <form onSubmit={handleSubmit} className="loginCover">
            <input
              className="signUpInput"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
<div className="passwordContainer">
  <input
    className="signUpInput"
    type={showPassword ? "text" : "password"}
    name="password"
    placeholder="Пароль"
    value={formData.password}
    onChange={handleChange}
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

            <div className="signUpBTNContainer">
              <button className="signUpInputBTN">вхід</button>

              <FontAwesomeIcon className="googleLogo" icon={faGoogle} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
