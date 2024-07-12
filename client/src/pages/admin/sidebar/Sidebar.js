import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
	UserOutlined,
	BarChartOutlined,
	LogoutOutlined,
} from "@ant-design/icons";
import "./Sidebar.scss";

export default function Sidebar() {
	const nav = useNavigate();

	function handleLogOut() {
		localStorage.removeItem("username");
		nav("/");
	}

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
				<Link to={"/admin/statistic/account"}>
					<BarChartOutlined /> Thống kê tài khoản
				</Link>
			</div>
			<div className="sidebar__link">
				<Link to={"/admin/statistic/product"}>
					<BarChartOutlined /> Thống kê sản phẩm
				</Link>
			</div>
			<div className="sidebar__link logout" onClick={handleLogOut}>
				Admin <LogoutOutlined />
			</div>
		</div>
	);
}
