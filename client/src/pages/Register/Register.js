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
import React, { useState } from "react";
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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const nav = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const data = await fetch(`${MainAPI}/user/register`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(form),
      }).then((res) => res.json());

      if (data.status === 200) {
        toast.success(data.message);
        nav("/login");
      } else {
        toast.error(data.message);
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
        <ToastContainer />
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
              <form className="loginForm" onSubmit={handleRegister}>
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
                      name="name"
                      onChange={handleChange}
                      fullWidth="100%"
                    />
                  </FormControl>
                </div>
                <div className="form-textField">
                  <FormControl fullWidth="100%">
                    <InputLabel htmlFor="outlined-adornment-username">
                      Email
                    </InputLabel>
                    <OutlinedInput
                      style={{ borderRadius: "10px" }}
                      id="outlined-adornment-username"
                      endAdornment={
                        <InputAdornment position="end">
                          <AlternateEmailIcon fontSize="large" />
                        </InputAdornment>
                      }
                      label="Email"
                      name="email"
                      onChange={handleChange}
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
                            style={{
                              paddingRight: "12px",
                            }}
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
                      name="password"
                      onChange={handleChange}
                    />
                  </FormControl>
                </div>
                <div className="form-textField">
                  <FormControl fullWidth="100%">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Nhập lại mật khẩu
                    </InputLabel>
                    <OutlinedInput
                      style={{ borderRadius: "10px" }}
                      id="outlined-adornment-password"
                      type={showPassword1 ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            style={{
                              paddingRight: "12px",
                            }}
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword1}
                            onMouseDown={handleMouseDownPassword}
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
                      onChange={handleChange}
                    />
                  </FormControl>
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
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: "2.4rem",
                        },
                      }}
                    />
                    <span style={{ fontSize: "2rem" }}>
                      Tôi đã đọc và đồng ý với các điều khoản sử dụng
                    </span>
                  </label>
                </Box>
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
                      Bạn đã là thành viên ? Đăng nhập tại đây
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
