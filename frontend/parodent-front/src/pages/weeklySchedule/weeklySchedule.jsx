import React, { useState, useEffect } from "react";
import "./weeklySchedule.css";
import Logo from "../../components/logo/Logo.jsx";
import NavBar from "../../components/navBar/NavBar.jsx";
import Appointment from "../../components/appointments/Appointment.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

function WeeklySchedule() {
    const rooms = [
        { id: 1, doctor: "Тодосюк Д.Є.", assistant: "Кравчук І.В." },
        { id: 2, doctor: "Коваленко А.О.", assistant: "Мельник А.М." },
        { id: 3, doctor: "Сидоренко Н.К.", assistant: "Романюк О.С." },
        { id: 4, doctor: "Іванов І.О.", assistant: "Шевчук Т.В." },
        { id: 5, doctor: "Петренко С.В.", assistant: "Бондар О.М." },
        { id: 6, doctor: "Дяченко М.С.", assistant: "Григоренко Ю.І." },
        { id: 7, doctor: "Гончар О.Л.", assistant: "Олійник І.С." },
        { id: 8, doctor: "Жук Т.П.", assistant: "Савчук Л.П." },
      ];

const { logout, user } = useAuth()
const navigate = useNavigate()
const [appointments, setAppointments] = useState({})

const token = localStorage.getItem('token')

const handleLogout = () => {
    logout()
    navigate('/login')
}

useEffect(() => {
    const fetchAppointments = async() => {
        try {
            const response = await axios.get('http://localhost:3000/api/appointments', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setAppointments(response.data)
        } catch (error) {
            console.error('Error fetching appointments:', error)
        }
    }

    fetchAppointments()
},[user])
return (
<div className="weeklyScheduleBody">
    <Logo/>
    <NavBar />
    <div className="weeklyScheduleContent">
    {rooms.map((room) => (
          <div className="room" key={room.id}>
            <h1 className="roomName">Кабінет {room.id}</h1>
            <div className="appointmentContainer">
                {(appointments[room.id] || []).map((appointment) => (
                    <Appointment key={appointment.id} appointment={appointment}/>
                ))}
            </div>
            <div className="roomPersonal">
              <h1><span>Лікар</span>: {room.doctor}</h1>
              <h1><span>Асистент</span>: {room.assistant}</h1>
            </div>
          </div>
        ))}
    </div>
        
    <button className="logOutBtn" onClick={handleLogout}>Log Out</button>
</div>
);
}

export default WeeklySchedule;