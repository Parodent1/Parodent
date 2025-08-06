import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from './sections/dashboard/Dashboard';
import Appointments from './sections/appointments/Appointments';
import Patients from './sections/patients/Patients';
import Staff from './sections/staff/Staff';
import { useAuth } from "../../context/AuthContext";
import LogIn from "../authPages/login/Login";

import PrivateRoute from "../../../privateRoute";

import './content.css';

function DefaultRoute() {
  const {isAuthenticated, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  return isAuthenticated ? <Navigate to="/appointments"/> : <Navigate to="/login"/>
}

function Content() {
  return (
    <div className='contentBody'>
      <Routes>
        <Route path='/' element={<DefaultRoute />} />
        <Route path="/login" element={<LogIn/>} />

        <Route path='/appointments' element={
          <PrivateRoute>
            <Appointments />
          </PrivateRoute>
        } />

        <Route path='/dashboard' element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />

        <Route path='/patients' element={
          <PrivateRoute>
            <Patients />
          </PrivateRoute>
        } />

        <Route path='/staff' element={
          <PrivateRoute>
            <Staff />
          </PrivateRoute>
        } />
      </Routes>
    </div>
  );
}

export default Content;
