import React, { useEffect, useState } from "react";
import "./AdminPage.scss";
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
	TablePagination,
} from "@mui/material";
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminPage() {
	const baseURL = "http://localhost:8000/admin/get-all-user";
	const [usersAPI, setUsersAPI] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	useEffect(() => {
		fetch(baseURL)
			.then((response) => response.json())
			.then((data) => setUsersAPI(data.data))
			.catch((error) => console.log(error));
	}, []);

	const fetchAccount = () => {
		fetch(baseURL)
			.then((response) => response.json())
			.then((data) => {
				console.log("Fetched users data:", data);
				setUsersAPI(data.data);
			})
			.catch((error) => console.log(error));
	};

	const handleDelete = (user_id) => {
		console.log("Deleting user with id:", user_id);
		if (window.confirm("Are you sure you want to delete this account?")) {
			fetch(`http://localhost:8000/admin/delete-user/${user_id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					"x-access-token": localStorage.getItem("accessToken"),
				},
			})
				.then((response) => {
					if (!response.ok) {
						throw new Error(`HTTP Status: ${response.status}`);
					}
					toast.success("Xóa người dùng thành công", {
						autoClose: 1500,
					});
					fetchAccount();
				})
				.catch((error) => console.log("Delete failed: ", error));
		}
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	return (
		<div className="AdminPage">
			<ToastContainer />
			<Grid container spacing={2}>
				<Grid item md={2}>
					<Sidebar />
				</Grid>
				<Grid item md={10}>
					<div className="admin__content">
						<h1 className="admin__title">Quản lý tài khoản</h1>
						<Link to="/addAccount">
							<Button type="primary" className="addNewAccount">
								Add new account
							</Button>
						</Link>
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
									{usersAPI
										.slice(
											page * rowsPerPage,
											page * rowsPerPage + rowsPerPage
										)
										.map(
											(user) =>
												user.status && (
													<TableRow
														key={user.user_id}
													>
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
															<Link
																to={`/update/${user.user_id}`}
															>
																<button className="action-btn edit">
																	<MdEdit />
																</button>
															</Link>
															<button
																className="action-btn trash"
																onClick={() =>
																	handleDelete(
																		user.user_id
																	)
																}
															>
																<FaTrashAlt />
															</button>
														</TableCell>
													</TableRow>
												)
										)}
								</TableBody>
							</Table>
							<TablePagination
								rowsPerPageOptions={[5, 10, 25]}
								component="div"
								count={usersAPI.length}
								rowsPerPage={rowsPerPage}
								page={page}
								onPageChange={handleChangePage}
								onRowsPerPageChange={handleChangeRowsPerPage}
							/>
						</TableContainer>
					</div>
				</Grid>
			</Grid>
		</div>
	);
}
