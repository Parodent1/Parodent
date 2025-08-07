import { createContext, useState, useContext } from "react";

// Створюємо сам контекст
const AppointmentTabsContext = createContext();

// Провайдер, який буде обгортати дерево
export function AppointmentTabsProvider({ children }) {
  const [selectedTab, setSelectedTab] = useState("allClinic");

  return (
    <AppointmentTabsContext.Provider value={{ selectedTab, setSelectedTab }}>
      {children}
    </AppointmentTabsContext.Provider>
  );
}

// Кастомний хук для зручного доступу
export function useAppointmentTabs() {
  return useContext(AppointmentTabsContext);
}
