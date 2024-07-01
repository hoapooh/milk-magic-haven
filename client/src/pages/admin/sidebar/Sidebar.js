import React from "react";
import { Link } from "react-router-dom";
import { UserOutlined, BarChartOutlined, ShopOutlined, LogoutOutlined } from "@ant-design/icons";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div className="Sidebar">
      <div className="user">
        <UserOutlined />
        <Link to={"/account"}>Quản lí tài khoản</Link>
      </div>
      <div className="statistic">
        <BarChartOutlined />
        <Link to={"/revenue"}>Thống kê doanh thu</Link>
      </div>
      <div className="product">
        <ShopOutlined />
        <Link to={"/product"}>Quản lí sản phẩm</Link>
      </div>
      <div className="logout">
        <LogoutOutlined />
      </div>
    </div>
  );
}
