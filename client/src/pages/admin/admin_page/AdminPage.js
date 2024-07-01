import React from "react";
import "./AdminPage.css";
import Sidebar from "../sidebar/Sidebar";

export default function AdminPage() {
  return (
    <div className="AdminPage">
      <div className="AdminPage__left">
        <Sidebar />
      </div>
      <div className="AdminPage__right"></div>
    </div>
  );
}
