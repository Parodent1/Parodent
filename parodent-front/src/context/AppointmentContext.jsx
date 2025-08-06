import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { useAppointmentDate } from "./AppointmentDataContext";

const AppointmentContext = createContext();

export const useAppointments = () => useContext(AppointmentContext)

export const AppointmentProvider = ({children}) => {
    const [appointments, setAppointments] = useState([]);
    const { selectedDate } = useAppointmentDate();

    const fetchAppointments = async () => {
        const token = localStorage.getItem("token");
        const formattedDate = dayjs(selectedDate).format("YYYY-MM-DD");
    
        try {
        const res = await axios.get(
            `http://localhost:3000/apiAppointment/appointments?date=${formattedDate}`,
            {
            headers: { Authorization: `Bearer ${token}` },
            }
        );
        
        // console.log(res.data)
        const groupedAppointments = res.data;

        const allAppointments = Object.values(groupedAppointments).flat();
    
        setAppointments(allAppointments);
        } catch (err) {
        console.error("Failed to fetch appointments", err);
        }
    };
    
    useEffect(() => {
        fetchAppointments();
    }, [selectedDate]);
    
    const deleteAppointment = async(id) => {
        const token = localStorage.getItem("token");
        try {
            await axios.delete(`http://localhost:3000/apiAppointment/appointment/${id}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setAppointments(prev => prev.filter(appt => appt.id !== id))
        } catch (error) {
            console.error('Error deleting appointment:', error)
        }
    }

    const editAppointment = async(id, updatedData) => {
        const token = localStorage.getItem('token');
        try {
            await axios.put(`http://localhost:3000/apiAppointment/appointment/${id}`,
                updatedData,
                {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setAppointments((prev) => prev.map((appt) => {appt.id === id ? {...appt, ...res.data}: appt}))
    } catch (eror) {
        console.error("Error editing appointment:", eror);
    }
}
    return (
        <AppointmentContext.Provider value={{ appointments, fetchAppointments, deleteAppointment, editAppointment }}>
        {children}
        </AppointmentContext.Provider>
    );
    };
