import {
	Box,
	Button,
	Container,
	FormControl,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	Typography,
} from "@mui/material";
import React from "react";
import "./Login.css";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";

export default function Login() {
	const [showPassword, setShowPassword] = React.useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	return (
		<div style={{ backgroundColor: "#f8f8f8", padding: "100px 0" }}>
			<Container
				className="login__container"
				maxWidth="xl"
				style={{ width: "1280px" }}
			>
				<Grid container spacing={3} className="login__content">
					<Grid item md={6} className="login__image">
						<figure>
							<img
								src="/assets/images/login-image.jpg"
								alt="A guy typing a laptop"
							/>
						</figure>
					</Grid>
					<Grid item md={6} className="login__form">
						<Typography
							className="loginForm__title"
							fontWeight={"bold"}
							variant="h1"
							mb={2}
						>
							Đăng nhập
						</Typography>

						{/* ================ LOGIN FORM ================ */}
						<form className="loginForm" method="POST" action="/" id="loginForm">
							<div className="form-textField">
								<FormControl fullWidth="100%">
									<InputLabel htmlFor="outlined-adornment-username">
										Tên đăng nhập
									</InputLabel>
									<OutlinedInput
										style={{ borderRadius: "10px" }}
										id="outlined-adornment-username"
										endAdornment={
											<InputAdornment position="end">
												<AccountCircle fontSize="large" />
											</InputAdornment>
										}
										label="Username"
										fullWidth="100%"
									/>
								</FormControl>
							</div>
							<div className="form-textField">
								<FormControl fullWidth="100%">
									<InputLabel htmlFor="outlined-adornment-password">
										Mật khẩu
									</InputLabel>
									<OutlinedInput
										style={{ borderRadius: "10px" }}
										id="outlined-adornment-password"
										type={showPassword ? "text" : "password"}
										endAdornment={
											<InputAdornment position="end">
												<IconButton
													style={{ paddingRight: "12px" }}
													aria-label="toggle password visibility"
													onClick={handleClickShowPassword}
													onMouseDown={handleMouseDownPassword}
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
									/>
								</FormControl>
							</div>
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
									Đăng nhập
								</Button>
								<Link to={"/register"}>
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
										Tạo tài khoản
									</Button>
								</Link>
							</Box>
						</form>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
}