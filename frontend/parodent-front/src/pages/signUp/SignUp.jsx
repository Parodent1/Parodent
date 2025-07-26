
import LogoSignIn from '../../components/logoSing/LogoSignIn'
import React, { useState, useEffect } from "react";
import "./signUp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function SignUp() {
const [formData, setFormData] = useState({
email: "",
password: "",
name: "",
surname: "",
});

const navigate = useNavigate();

const { isAuthenticated } = useAuth();

useEffect(() => {
    if (isAuthenticated) {
    navigate('/schedule');
    }
}, [isAuthenticated])


const handleChange = (e) => {
const { name, value } = e.target;
setFormData((prev) => ({
    ...prev,
    [name]: value,
}));
};
const handleSubmit = async(e) => {
e.preventDefault();
try {
    const response = await axios.post('http://localhost:3000/api/doctors', {
        email: formData.email,
        password: formData.password,
        firstname: formData.name,
        lastname: formData.surname
    })

    const user = response.data;
    navigate('/login')
    console.log(user)
} catch (error) {
    
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
        <h1>реєстрація</h1>
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
    <input
        className="signUpInput"
        type="text"
        name="name"
        placeholder="Ім’я"
        value={formData.name}
        onChange={handleChange}
        required
    />
    <input
        className="signUpInput"
        type="text"
        name="surname"
        placeholder="Прізвище"
        value={formData.surname}
        onChange={handleChange}
        required
    />
        <div className="signUpBTNContainer">
        <button type="submit" className="signUpInputBTN">реєстрація</button>
        <FontAwesomeIcon className="googleLogo" icon={faGoogle} />
        </div>
        </form>
    </div>
    </div>
</div>
);
}

export default SignUp;