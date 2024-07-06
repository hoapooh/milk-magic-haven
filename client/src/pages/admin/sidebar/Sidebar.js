import React from "react";
import { Link } from "react-router-dom";
import { UserOutlined, BarChartOutlined, LogoutOutlined } from "@ant-design/icons";
import "./Sidebar.scss";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__link">
        <img src="/assets/images/logo-big-2.webp" alt="logo" />
      </div>
      <div className="sidebar__link">
        <Link to={"/admin"}>
          <UserOutlined /> Quản lí tài khoản
        </Link>
      </div>
      <div className="sidebar__link">
        <Link to={"/admin/statistic"}>
          <BarChartOutlined /> Thống kê số liệu
        </Link>
      </div>
      <div className="sidebar__link logout">
        Admin <LogoutOutlined />
      </div>
    </div>
  );
}
