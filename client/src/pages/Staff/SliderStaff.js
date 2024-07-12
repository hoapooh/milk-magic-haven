import React, { useEffect } from "react";
import "./SliderBar.css";
import { useNavigate } from "react-router-dom";

export default function SliderStaff() {
  const nav = useNavigate();

  useEffect(() => {
    nav('/staff/manageorder');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("accessToken");
    nav("/login");
  };
  return (
    <nav className="navbarstaff">
      <div className="navbarstaff-logo">Staff Management</div>
      <ul className="navbarstaff-menu">
        <li>
          <a
            onClick={() => {
              nav("/staff/manageorder");
            }}
          >
            Management Order
          </a>
        </li>
        <li>
          <a
            onClick={() => {
              nav("/staff/manageproduct");
            }}
          >
            Management Product
          </a>
        </li>
        <li>
          <a
            onClick={() => {
              nav("/staff/managevoucher");
            }}
          >
            Management Voucher
          </a>
        </li>
        <li>
          <a
            onClick={() => {
              nav("/staff/managepost");
            }}
          >
            Management Post
          </a>
        </li>
        <li>
          <a
            onClick={() => {
              nav("/staff/manageuser");
            }}
          >
            Management Users
          </a>
        </li>
        <li>
          <a onClick={handleLogout}>Logout</a>
        </li>
      </ul>
    </nav>
  );
}
