import {
	Box,
	Button,
	Checkbox,
	Container,
	FormControl,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Register.scss";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import { Link, useNavigate } from "react-router-dom";
import AuthNav from "../../components/AuthNav/AuthNav";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { MainAPI } from "../../API";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { useFormik } from "formik";

export default function Register() {
	const baseURL = `${MainAPI}/admin/get-all-user`;
	const [users, setUsers] = useState([]);
	const [showPassword, setShowPassword] = useState(false);
	const [showPassword1, setShowPassword1] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(baseURL);
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data = await response.json();
				setUsers(data.data);
			} catch (error) {
				console.error("Fetching error: ", error);
			}
		};
		fetchData();
	}, [baseURL]);

	const nav = useNavigate();

	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleClickShowPassword1 = () => setShowPassword1((show) => !show);

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			password: "",
			repeatPassword: "",
			acceptedTerms: false,
		},

		onSubmit: (values) => {
			handleRegister(values);
		},

		validationSchema: Yup.object({
			name: Yup.string()
				.required("Bắt buộc.")
				.min(3, "Phải có ít nhất 3 ký tự"),
			email: Yup.string()
				.email("Địa chỉ email không hợp lệ.")
				.required("Bắt buộc."),
			password: Yup.string()
				.required("Bắt buộc.")
				.min(3, "Phải có ít nhất 3 ký tự"),
			repeatPassword: Yup.string()
				.required("Bắt buộc.")
				.min(3, "Phải có ít nhất 3 ký"),
			acceptedTerms: Yup.bool()
				.required(
					"Bạn phải đồng ý với các điều khoản sử dụng để tiếp tục."
				)
				.oneOf(
					[true],
					"Bạn phải đồng ý với các điều khoản sử dụng để tiếp tục."
				),
		}),
	});

	const handleRegister = async (values) => {
		// Kiểm tra xem username hoặc email đã tồn tại trong danh sách users hay không
		const userExists = users.some(
			(user) =>
				user.username === values.name || user.email === values.email
		);

		if (userExists) {
			toast.error(
				"Tên đăng nhập hoặc email đã tồn tại. Vui lòng thử lại với tên đăng nhập hoặc email khác.",
				{
					position: "top-right",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				}
			);
			return; // Dừng hàm nếu tên đăng nhập hoặc email đã tồn tại
		}

		try {
			const data = await fetch(`${MainAPI}/user/register`, {
				method: "POST",
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
				body: JSON.stringify(values),
			}).then((res) => res.json());

			if (data.status === 200) {
				toast.success(
					"Đăng ký tài khoản thành công! Đang chuyển hướng...",
					{
						onClose: () => {
							nav("/login");
						},
						position: "top-right",
						autoClose: 1500,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					}
				);
				setTimeout(() => {
					nav("/login");
				}, 2000);
			} else {
				toast.error("Đăng ký tài khoản thất bại! Vui lòng thử lại.", {
					position: "top-right",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<AuthNav />
			<Header />
			<div style={{ backgroundColor: "#f8f8f8", padding: "100px 0" }}>
				<Container
					className="login__container"
					maxWidth="xl"
					style={{ width: "1280px" }}
				>
					<Grid container spacing={3} className="login__content">
						{/* ======== FORM ========= */}
						<Grid item md={6} className="login__form">
							<Typography
								className="loginForm__title"
								fontWeight={"bold"}
								variant="h1"
								mb={2}
							>
								Đăng ký
							</Typography>

							{/* ================ LOGIN FORM ================ */}
							<form
								className="loginForm"
								onSubmit={formik.handleSubmit}
							>
								<div className="form-textField">
									<FormControl fullWidth="100%">
										<InputLabel htmlFor="outlined-adornment-Tên_đăng_nhập">
											Tên đăng nhập
										</InputLabel>
										<OutlinedInput
											style={{ borderRadius: "10px" }}
											id="outlined-adornment-Tên_đăng_nhập"
											endAdornment={
												<InputAdornment position="end">
													<AccountCircle fontSize="large" />
												</InputAdornment>
											}
											label="Tên_đăng_nhập"
											name="name"
											value={formik.values.name}
											onChange={formik.handleChange}
											fullWidth="100%"
										/>
									</FormControl>
									{formik.touched.name &&
										formik.errors.name && (
											<Typography
												color="error"
												variant="h4"
											>
												{formik.errors.name}
											</Typography>
										)}
								</div>
								<div className="form-textField">
									<FormControl fullWidth="100%">
										<InputLabel htmlFor="outlined-adornment-mail">
											Email
										</InputLabel>
										<OutlinedInput
											style={{ borderRadius: "10px" }}
											id="outlined-adornment-mail"
											endAdornment={
												<InputAdornment position="end">
													<AlternateEmailIcon fontSize="large" />
												</InputAdornment>
											}
											label="Email"
											name="email"
											value={formik.values.email}
											onChange={formik.handleChange}
											fullWidth="100%"
										/>
									</FormControl>
									{formik.touched.email &&
										formik.errors.email && (
											<Typography
												color="error"
												variant="h4"
											>
												{formik.errors.email}
											</Typography>
										)}
								</div>
								<div className="form-textField">
									<FormControl fullWidth="100%">
										<InputLabel htmlFor="outlined-adornment-password">
											Mật khẩu
										</InputLabel>
										<OutlinedInput
											style={{ borderRadius: "10px" }}
											id="outlined-adornment-password"
											type={
												showPassword
													? "text"
													: "password"
											}
											endAdornment={
												<InputAdornment position="end">
													<IconButton
														style={{
															paddingRight:
																"12px",
														}}
														aria-label="toggle password visibility"
														onClick={
															handleClickShowPassword
														}
														onMouseDown={
															handleMouseDownPassword
														}
														edge="end"
													>
														{showPassword ? (
															<VisibilityOff fontSize="large" />
														) : (
															<Visibility fontSize="large" />
														)}
													</IconButton>
												</InputAdornment>
											}
											label="Password"
											name="password"
											value={formik.values.password}
											onChange={formik.handleChange}
										/>
									</FormControl>
									{formik.touched.password &&
										formik.errors.password && (
											<Typography
												color="error"
												variant="h4"
											>
												{formik.errors.password}
											</Typography>
										)}
								</div>
								<div className="form-textField">
									<FormControl fullWidth="100%">
										<InputLabel htmlFor="outlined-adornment-password">
											Nhập lại mật khẩu
										</InputLabel>
										<OutlinedInput
											style={{ borderRadius: "10px" }}
											id="outlined-adornment-password"
											type={
												showPassword1
													? "text"
													: "password"
											}
											endAdornment={
												<InputAdornment position="end">
													<IconButton
														style={{
															paddingRight:
																"12px",
														}}
														aria-label="toggle password visibility"
														onClick={
															handleClickShowPassword1
														}
														onMouseDown={
															handleMouseDownPassword
														}
														edge="end"
													>
														{showPassword1 ? (
															<VisibilityOff fontSize="large" />
														) : (
															<Visibility fontSize="large" />
														)}
													</IconButton>
												</InputAdornment>
											}
											label="Repeat Password"
											name="repeatPassword"
											value={formik.values.repeatPassword}
											onChange={formik.handleChange}
										/>
									</FormControl>
									{formik.touched.repeatPassword &&
										formik.errors.repeatPassword && (
											<Typography
												color="error"
												variant="h4"
											>
												{formik.errors.repeatPassword}
											</Typography>
										)}
								</div>
								<Box
									sx={{
										display: "flex",
										gap: "10px",
										alignItems: "center",
										marginBottom: "10px",
									}}
								>
									<label
										style={{
											display: "flex",
											alignItems: "center",
										}}
									>
										<Checkbox
											name="acceptedTerms"
											sx={{
												"& .MuiSvgIcon-root": {
													fontSize: "2.4rem",
												},
											}}
											checked={
												formik.values.acceptedTerms
											}
											onChange={formik.handleChange}
										/>
										<span style={{ fontSize: "2rem" }}>
											Tôi đã đọc và đồng ý với các điều
											khoản sử dụng
										</span>
									</label>
								</Box>
								{formik.touched.acceptedTerms &&
									formik.errors.acceptedTerms && (
										<Typography color="error" variant="h4">
											{formik.errors.acceptedTerms}
										</Typography>
									)}
								<Box sx={{ display: "flex", gap: "10px" }}>
									<Button
										type="submit"
										variant="contained"
										size="large"
										style={{
											backgroundColor: "#0f83b2",
											fontSize: "2rem",
											padding: "10px 20px",
											borderRadius: "10px",
										}}
									>
										Đăng ký
									</Button>
									<Link to={"/login"}>
										<Button
											variant="outlined"
											size="large"
											style={{
												borderColor: "#0f83b2",
												fontSize: "2rem",
												padding: "10px 20px",
												borderRadius: "10px",
												color: "#0f83b2",
											}}
										>
											Bạn đã là thành viên ? Đăng nhập tại
											đây
										</Button>
									</Link>
								</Box>
							</form>
						</Grid>

						{/* ======== IMAGE ======== */}

						<Grid item md={6} className="login__image">
							<figure>
								<img
									src="/assets/images/signup-image.jpg"
									alt="A guy typing a laptop"
								/>
							</figure>
						</Grid>
					</Grid>
				</Container>
			</div>
			<Footer />
		</>
	);
}
