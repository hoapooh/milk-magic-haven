import React from "react";
import './SliderBar.css'
import { useNavigate } from "react-router-dom";

export default function SliderStaff() {
    const nav = useNavigate();

    const handleLogout = () => {
    };
    return (
        <nav className="navbarstaff">
            <div className="navbarstaff-logo">Staff Management</div>
            <ul className="navbarstaff-menu">
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
                            nav("/satff/user");
                        }}
                    >
                        Management Users
                    </a>
                </li>
                <li>
                    <a href="#settings">Settings</a>
                </li>
                <li>
                    <a onClick={handleLogout}>Logout</a>
                </li>
            </ul>
        </nav>
    );

}
