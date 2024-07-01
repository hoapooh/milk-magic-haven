import React from "react";
import "./Breadcrumb.css";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";

export default function Breadcrumb({ children }) {
	return (
		<>
			<Container className="breadcrumb__container" maxWidth={"xl"}>
				<div className="breadcrumb">
					<Link className="link__nav home" to="/">
						<i class="fa-solid fa-house"></i> Trang chủ
					</Link>{" "}
					/ <span className="link__nav active">{children}</span>
				</div>
			</Container>
		</>
	);
}
