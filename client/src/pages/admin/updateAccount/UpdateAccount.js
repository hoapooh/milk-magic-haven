import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { Grid } from "@mui/material";
import Sidebar from "../sidebar/Sidebar";
import "./UpdateAccount.scss";

export default function Update() {
	const { user_id } = useParams();
	const baseURL = `http://localhost:8000/admin/get-user-by-id/${user_id}`;
	const navigate = useNavigate();
	const [data, setData] = useState(null);

	const fetchAccount = async () => {
		try {
			const response = await axios.get(baseURL);
			console.log(response);
			setData(response.data.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchAccount();
	}, []);

	const formik = useFormik({
		initialValues: {
			username: data?.username,
			email: data?.email,
			password: data?.password,
			role_id: data?.role_id,
		},
		enableReinitialize: true,
		validationSchema: Yup.object({
			username: Yup.string().required("Required"),
			email: Yup.string()
				.email("Invalid email format")
				.required("Required"),
			password: Yup.string()
				.required("Required")
				.min(3, "Ít nhất 3 kí tự"),
			role_id: Yup.string().required("Required"),
		}),
		onSubmit: (values) => {
			axios
				.put(
					`http://localhost:8000/admin/update-user/${user_id}`,
					values,
					{
						headers: {
							"Content-Type": "application/json",
							"x-access-token":
								localStorage.getItem("accessToken"),
						},
					}
				)
				.then(() => {
					toast.success("Cập nhật tài khoản thành công", {
						onClose: () => {
							navigate("/admin");
						},
						autoClose: 1500,
					});
					setTimeout(() => {
						navigate("/admin");
					}, 2000);
				})
				.catch((error) => console.log(error));
		},
	});

	return (
		<div className="UpdateAccount">
			<ToastContainer />
			<Grid container spacing={2}>
				<Grid item md={2}>
					<Sidebar />
				</Grid>
				<Grid item md={10}>
					<div className="UpdateAccount__content">
						<h1 className="UpdateAccount__title">
							Cập nhật tài khoản
						</h1>
						<Container>
							<Row>
								<Col md={8} className="mx-auto">
									<Form onSubmit={formik.handleSubmit}>
										<Form.Group className="mb-3">
											<Form.Control
												type="text"
												placeholder="Username"
												name="username"
												value={formik.values.username}
												onChange={formik.handleChange}
											/>
											{formik.touched.username &&
												formik.errors.username && (
													<Alert variant="warning">
														{formik.errors.username}
													</Alert>
												)}
										</Form.Group>
										<Form.Group className="mb-3">
											<Form.Control
												type="text"
												placeholder="Email"
												name="email"
												value={formik.values.email}
												onChange={formik.handleChange}
											/>
											{formik.touched.email &&
												formik.errors.email && (
													<Alert variant="warning">
														{formik.errors.email}
													</Alert>
												)}
										</Form.Group>
										<Form.Group className="mb-3">
											<Form.Control
												type="text"
												placeholder="Password"
												name="password"
												value={formik.values.password}
												onChange={formik.handleChange}
											/>
											{formik.touched.password &&
												formik.errors.password && (
													<Alert variant="warning">
														{formik.errors.password}
													</Alert>
												)}
										</Form.Group>
										<Form.Group className="mb-3">
											<Form.Select
												aria-label="Default select example"
												name="role_id"
												value={formik.values.role_id}
												onChange={formik.handleChange}
												className="form-select"
											>
												<option value="">
													Open this select menu
												</option>
												<option value="admin">
													Admin
												</option>
												<option value="customer">
													Customer
												</option>
												<option value="staff">
													Staff
												</option>
											</Form.Select>
											{formik.touched.role_id &&
												formik.errors.role_id && (
													<Alert variant="warning">
														{formik.errors.role_id}
													</Alert>
												)}
										</Form.Group>
										<Form.Group>
											<Button
												type="submit"
												className="button"
											>
												Update
											</Button>
										</Form.Group>
									</Form>
								</Col>
							</Row>
						</Container>
					</div>
				</Grid>
			</Grid>
		</div>
	);
}
