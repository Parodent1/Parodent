import "./header.css";
import "./actionBtn.css";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import logo from "../../assets/logo.png";
import AppointmentActionBtn from "./appointmentActionBtn/AppointmentActionBtn";
import DashboardActionBtn from "./dashboardActionBtn/DashboardActionBtn";
import PatientsActionBtn from "./patientsActionBtn/PatientActionBtn";
import StaffActionBtn from "./staffActionBtn/StaffActionBtn";
import { useAuth } from "../../context/AuthContext";
import defaultImg from "../../assets/images.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

function Header() {
  const location = useLocation();
  const currentPath = location.pathname;

  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const tabs = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/patients", label: "Patients" },
    { path: "/appointments", label: "Appointments" },
    { path: "/staff", label: "Staff" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const navBarRef = useRef(null);
  const [sliderStyle, setSliderStyle] = useState({});

  useEffect(() => {
    const index = tabs.findIndex((tab) => tab.path === currentPath);
    setActiveIndex(index === -1 ? 0 : index);
  }, [currentPath]);

  useEffect(() => {
    if (!navBarRef.current) return;

    const navButtons = navBarRef.current.querySelectorAll(".navBarBtn");
    if (navButtons.length === 0) return;

    const activeBtn = navButtons[activeIndex];
    if (!activeBtn) return;

    const { offsetLeft, offsetWidth, offsetTop, offsetHeight } = activeBtn;

    setSliderStyle({
      left: offsetLeft,
      width: offsetWidth,
      top: offsetTop,
      height: offsetHeight,
    });
  }, [activeIndex]);

  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleShowProfileModal = () => {
    setShowProfileModal(!showProfileModal);
    console.log("Clicked, current value:", showProfileModal);
  };
  

  return (
    <div className="headerBody">
      <div className="headerContent">
        <div className="headerLogo">
          <img src={logo} alt="Logo" />
          <h1>Parodent</h1>
        </div>
        <div
          className="navBar"
          ref={navBarRef}
          style={{ position: "relative" }}
        >
          {tabs.map(({ path, label }, i) => (
            <Link
              key={path}
              to={path}
              className={
                currentPath === path ? "navBarBtn active" : "navBarBtn"
              }
            >
              {label}
            </Link>
          ))}
          <span
            className="selection"
            style={{
              ...sliderStyle,
              position: "absolute",
              borderRadius: "9999px",
              backgroundColor: "#000",
              transition: "all 0.3s ease",
              zIndex: 0,
            }}
          />
        </div>

        <div className="profileConteiner" onClick={handleShowProfileModal}>
          <div className="profileImg">
            <img
              src={user.photoURL || defaultImg}
              alt="Doctor Avatar"
              className="profileAvatar"
            />
          </div>
          <div className="profileInfo">
            <h4 className="doctorName">
              {user.firstname} {user.lastname}
            </h4>
            <h4 className="doctorRole">{user.position}</h4>
          </div>
          <FontAwesomeIcon icon={faArrowDown} />
          {showProfileModal && (
            <div
              className="profileModalBody"
              onClick={() => setShowProfileModal(false)}
            >
              <div
                className="profileModalContent"
                onClick={(e) => e.stopPropagation()}
              >
                <button className="ActionBtn" onClick={handleLogout}>
                  {" "}
                  <span
                    class="material-symbols-outlined"
                    style={{ color: "#FF5858" }}
                  >
                    logout
                  </span>
                  Logout
                </button>
                <button className="ActionBtn">
                  {" "}
                  <span
                    class="material-symbols-outlined"
                    style={{ color: "#FF5858" }}
                  >
                    settings
                  </span>
                  Settings
                </button>
                <button className="ActionBtn">
                  {" "}
                  <span
                    class="material-symbols-outlined"
                    style={{ color: "#FF5858" }}
                  >
                    photo
                  </span>
                  Update photo
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="AppointmentActionBtnContaier">
        <Routes>
          <Route path="/" element={<Navigate to="/appointments" />} />
          <Route path="/appointments" element={<AppointmentActionBtn />} />
          <Route path="/dashboard" element={<DashboardActionBtn />} />
          <Route path="/patients" element={<PatientsActionBtn />} />
          <Route path="/staff" element={<StaffActionBtn />} />
        </Routes>
      </div>
    </div>
  );
}

export default Header;
