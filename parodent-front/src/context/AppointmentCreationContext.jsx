import { createContext, useState, useContext } from "react";

// Створюємо сам контекст
const AppointmentCreationContext = createContext();

// Провайдер, який буде обгортати дерево
export function AppointmentCreation({ children }) {
  const [showAppointmentCreation, setShowAppointmentCreation] = useState(false);

  return (
    <AppointmentCreationContext.Provider value={{ showAppointmentCreation, setShowAppointmentCreation }}>
      {children}
    </AppointmentCreationContext.Provider>
  );
}

// Кастомний хук для зручного доступу
export function useShowAppointmentCreation() {
  return useContext(AppointmentCreationContext);
}
