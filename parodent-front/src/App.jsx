import "./app.css";
import Header from "./components/header/Header";
import { AppointmentTabsProvider } from "./context/AppointmentTabsContext";
import Content from "./pages/content/Content";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "../privateRoute";
import Login from "./pages/authPages/login/Login";
import PasswordRecover from "./pages/authPages/passwordRecover/PasswordRecover";
import { AppointmentDateProvider } from "./context/AppointmentDataContext";
import { AppointmentCreation } from "./context/AppointmentCreationContext"
import { AppointmentProvider } from "./context/AppointmentContext";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <AppointmentDateProvider>
        <AppointmentProvider>
          <div className="appBody">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/passwordRecover" element={<PasswordRecover />} />
            </Routes>
            <PrivateRoute>
              <AppointmentCreation>
                <AppointmentTabsProvider>
                  <Header />
                  <Content />
                </AppointmentTabsProvider>
              </AppointmentCreation>
            </PrivateRoute>
          </div>
        </AppointmentProvider>
      </AppointmentDateProvider>
    </AuthProvider>
  );
}

export default App;
