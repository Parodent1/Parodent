import React, { useState } from "react";

import "../signUp/SignUp.css";
import Logo from "../../components/logo/Logo"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import axios from 'axios';




function SignIn() {
const [formData, setFormData] = useState({
email: "",
password: "",
name: "",
surname: "",
});
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
        const response = await axios.post('http://localhost:3000/api/login', {
            email: formData.email,
            password: formData.password
        })

        const token = response.data.token
        localStorage.setItem('token', token)
        console.log('Login successful! Token: ' + token)
    } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);
    }
};
return (
<div className="body">
    <div className="content">
    <div className="logoContainer">
        <Logo />
    </div>
    <div className="signUpInputContainer">
        <h1>вхід</h1>
        <form onSubmit={handleSubmit}>
        <input
        className="signUpInput"
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
    />
    <input
        className="signUpInput"
        type="password"
        name="password"
        placeholder="Пароль"
        value={formData.password}
        onChange={handleChange}
        required
    />

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