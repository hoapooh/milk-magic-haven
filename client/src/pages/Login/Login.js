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
import "./Login.scss";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import AuthNav from "../../components/AuthNav/AuthNav";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { MainAPI } from "../../API";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const nav = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await fetch(`${MainAPI}/user/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ email: email, password: password }),
      }).then((res) => res.json());

      if (data.status === 200) {
        toast.success(data.message);
        nav("/");
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
              <form className="loginForm" id="loginForm" onSubmit={handleLogin}>
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
                      name="email"
                      label="Email"
                      onChange={(e) => setEmail(e.target.value)}
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
                      name="password"
                      label="Password"
                      onChange={(e) => setPassword(e.target.value)}
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
      <Footer />
    </>
  );
}
