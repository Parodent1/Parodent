import { createContext, useState, useContext } from "react";

// Створюємо сам контекст
const AppointmentCreationContext = createContext();

// Провайдер, який буде обгортати дерево
export function AppointmentCreationProvider({ children }) {
const [showAppointmentCreation, setShowAppointmentCreation] = useState(false);
const [editingAppointment, setEditingAppointment ] = useState(null)

return (
    <AppointmentCreationContext.Provider value={{ 
        showAppointmentCreation,
        setShowAppointmentCreation, 
        editingAppointment, 
        setEditingAppointment }}>
    {children}
    </AppointmentCreationContext.Provider>
);
}

// Кастомний хук для зручного доступу
export function useShowAppointmentCreation() {
    return useContext(AppointmentCreationContext);
}