import React, { useEffect, useState } from "react";
import "./AdminPage.css";
import Sidebar from "../sidebar/Sidebar";
import {
	Grid,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function AdminPage() {
	const baseURL = "http://localhost:8000/user/get-all-user";
	const [usersAPI, setUsersAPI] = useState([]);

	useEffect(() => {
		fetch(baseURL)
			.then((response) => response.json())
			.then((data) => setUsersAPI(data.data))
			.catch((error) => console.log(error));
	}, []);

	return (
		<div className="AdminPage">
			<Grid container spacing={2}>
				<Grid item md={2}>
					<Sidebar />
				</Grid>
				<Grid item md={10}>
					<div className="admin__content">
						<h1 className="admin__title">Quản lý tài khoản</h1>
						<TableContainer
							component={Paper}
							className="table__container"
						>
							<Table
								className="admin__table"
								aria-label="simple table"
							>
								<TableHead>
									<TableRow>
										<TableCell>Tên đăng nhập</TableCell>
										<TableCell>Mật khẩu</TableCell>
										<TableCell>Email</TableCell>
										<TableCell>Vai trò</TableCell>
										<TableCell>Action</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{usersAPI.map(
										(user) =>
											user.status && (
												<TableRow>
													<TableCell>
														{user.username}
													</TableCell>
													<TableCell>
														{user.password}
													</TableCell>
													<TableCell>
														{user.email}
													</TableCell>
													<TableCell>
														{user.role_id}
													</TableCell>
													<TableCell className="call-to-action">
														<Link to={"/##"}>
															<button className="action-btn edit">
																<MdEdit />
															</button>
														</Link>
														<Link to={"/##"}>
															<button className="action-btn trash">
																<FaTrashAlt />
															</button>
														</Link>
													</TableCell>
												</TableRow>
											)
									)}
								</TableBody>
							</Table>
						</TableContainer>
					</div>
				</Grid>
			</Grid>
		</div>
	);
}
