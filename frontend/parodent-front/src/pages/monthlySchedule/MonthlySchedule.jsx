import React from 'react'
import './monthlySchedule.css'
import Logo from '../../components/logo/Logo'
import NavBar from '../../components/navBar/NavBar'
import MonthlyAppointments from '../../components/monthlyAppointments/MonthlyAppointments'


import { useAuth } from "../../context/AuthContext.jsx";

function MonthlySchedule() {
    const handleLogout = () => {
        logout()
        navigate('/login')
    }
    const { logout, user } = useAuth()
  return (
    <div className="monthlyScheduleBody">
      <Logo />
      <NavBar />
      <div className="monthlyScheduleContent">
        <div className="weeksContainer">
          <div className="weekBox">
            <div className="weekName"> тиждень 1</div>
            <div className="daysContainer">
              <div className="monthlyScheduleday">
                <div className="weekDate">
                  <h1 className="dayName">понеділок</h1>
                  <h1 className="dayDate">01.12</h1>
                </div>
                <div className="monthlyAppointmentsBox">
                  <MonthlyAppointments />
                  <MonthlyAppointments />
                  <MonthlyAppointments />
                  <MonthlyAppointments />
                  <MonthlyAppointments />
                </div>
              </div>
              <div className="monthlyScheduleday">
                <div className="weekDate">
                  <h1 className="dayName">вівторок</h1>
                  <h1 className="dayDate">02.12</h1>
                </div>
                <div className="monthlyAppointmentsBox">
                  <MonthlyAppointments />
                  <MonthlyAppointments />
                  <MonthlyAppointments />
                  <MonthlyAppointments />
                  <MonthlyAppointments />
                </div>
              </div>
              <div className="monthlyScheduleday">
                <div className="weekDate">
                  <h1 className="dayName">середа</h1>
                  <h1 className="dayDate">03.12</h1>
                </div>
                <div className="monthlyAppointmentsBox">
                  <MonthlyAppointments />
                  <MonthlyAppointments />
                  <MonthlyAppointments />
                  <MonthlyAppointments />
                  <MonthlyAppointments />
                </div>
              </div>
              <div className="monthlyScheduleday">
                <div className="weekDate">
                  <h1 className="dayName">четвер</h1>
                  <h1 className="dayDate">04.12</h1>
                </div>
                <div className="monthlyAppointmentsBox">
                  <MonthlyAppointments />
                  <MonthlyAppointments />
                  <MonthlyAppointments />
                  <MonthlyAppointments />
                  <MonthlyAppointments />
                </div>
              </div>
              <div className="monthlyScheduleday">
                <div className="weekDate">
                  <h1 className="dayName">п'ятниця</h1>
                  <h1 className="dayDate">05.12</h1>
                </div>
                <div className="monthlyAppointmentsBox">
                  <MonthlyAppointments />
                  <MonthlyAppointments />
                  <MonthlyAppointments />
                  <MonthlyAppointments />
                  <MonthlyAppointments />
                </div>
              </div>
              <div className="monthlyScheduleday">
                <div className="weekDate">
                  <h1 className="dayName">субота</h1>
                  <h1 className="dayDate">06.12</h1>
                </div>
                <div className="monthlyAppointmentsBox">
                  <MonthlyAppointments />
                  <MonthlyAppointments />
                  <MonthlyAppointments />
                  <MonthlyAppointments />
                  <MonthlyAppointments />
                </div>
              </div>
            </div>
          </div>
          <div className="weekBox">
            <div className="weekName"> тиждень 2</div>
            <div className="daysContainer">
              
            </div>
          </div>
          <div className="weekBox">
            <div className="weekName"> тиждень 3</div>
            <div className="daysContainer"></div>
          </div>
          <div className="weekBox">
            <div className="weekName"> тиждень 4</div>
            <div className="daysContainer"></div>
          </div>
        </div>
      </div>

    <button className="logOutBtn" onClick={handleLogout}>Log Out</button>
    </div>
  )
}

export default MonthlySchedule