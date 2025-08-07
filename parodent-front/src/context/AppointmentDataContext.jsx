import { createContext, useContext, useState } from "react";
import dayjs from "dayjs";

const AppointmentDateContext = createContext();

export const AppointmentDateProvider = ({ children }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
    <AppointmentDateContext.Provider value={{ selectedDate, setSelectedDate }}>
    {children}
    </AppointmentDateContext.Provider>
    );
};

export const useAppointmentDate = () => useContext(AppointmentDateContext);
