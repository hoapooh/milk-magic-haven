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
import React, { useEffect, useState } from "react";
import "./Login.scss";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import AuthNav from "../../components/AuthNav/AuthNav";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { MainAPI } from "../../API";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { useFormik } from "formik";

export default function Login() {
  const baseURL = `${MainAPI}/admin/get-all-user`;
  const [users, setUsers] = useState([]);
  const [showPassword, setShowPassword] = React.useState(false);
  const nav = useNavigate();

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

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: () => {
      handleLogin();
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .required("Bắt buộc.")
        .test(
          "is-email-or-username",
          "Email hoặc tên đăng nhập không hợp lệ.",
          (value) => {
            // Kiểm tra xem giá trị có phải là email hợp lệ
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(value)) {
              return true; // Nếu là email hợp lệ
            }
            // Thêm bất kỳ quy tắc xác thực nào cho tên đăng nhập ở đây
            // Ví dụ: không cho phép khoảng trắng, độ dài tối thiểu, v.v.
            const usernameRegex = /^[^\s]+$/; // Không chứa khoảng trắng
            return usernameRegex.test(value);
          }
        ),
      password: Yup.string()
        .required("Bắt buộc.")
        .min(3, "Phải chứa ít nhất 3 ký tự."),
    }),
  });

  const handleLogin = async () => {
    try {
      const data = await fetch(`${MainAPI}/user/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          email: formik.values.email,
          password: formik.values.password,
        }),
      }).then((res) => res.json());

      console.log(data.data.role_id);

      if (data.status === 200) {
        localStorage.setItem("accessToken", data.accessToken);
        if (data.data.role_id === "customer") {
          setTimeout(() => {
            nav("/");
          }, 2000);
        } else if (data.data.role_id === "staff") {
          setTimeout(() => {
            nav("/staff");
          }, 2000);
        } else if (data.data.role_id === "admin") {
          setTimeout(() => {
            nav("/admin");
          }, 2000);
        }

        toast.success("Đăng nhập thành công!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        const userExists = users.find(
          (user) =>
            user.username === formik.values.email ||
            user.email === formik.values.email
        );

        // Lưu username và thời gian hiện tại vào localStorage
        localStorage.setItem("username", userExists.username);
        localStorage.setItem("sessionStartTime", Date.now().toString());

        // Thiết lập thời gian sống cho session là 30 phút
        setTimeout(() => {
          // Xóa thông tin người dùng khỏi localStorage sau 30 phút
          localStorage.removeItem("username");
          localStorage.removeItem("sessionStartTime");
          // Redirect người dùng ra trang đăng nhập hoặc trang chủ
          nav("/login");
        }, 1800000); // 1800000 milliseconds = 30 minutes
      } else {
        toast.error("Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin.", {
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
              <form
                className="loginForm"
                id="loginForm"
                onSubmit={formik.handleSubmit}
              >
                <div className="form-textField">
                  <FormControl fullWidth>
                    <InputLabel htmlFor="outlined-adornment-Tên_đăng_nhập">
                      Tên đăng nhập hoặc Email
                    </InputLabel>
                    <OutlinedInput
                      style={{ borderRadius: "10px" }}
                      id="outlined-adornment-Tên_đăng_nhập"
                      endAdornment={
                        <InputAdornment position="end">
                          <AccountCircle fontSize="large" />
                        </InputAdornment>
                      }
                      name="email"
                      label="Tên_đăng_nhập_hoặc"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      fullWidth
                    />
                  </FormControl>
                  {formik.touched.email && formik.errors.email && (
                    <Typography color="error" variant="h4">
                      {formik.errors.email}
                    </Typography>
                  )}
                </div>
                <div className="form-textField">
                  <FormControl fullWidth>
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
                      value={formik.values.password}
                      onChange={formik.handleChange}
                    />
                  </FormControl>
                  {formik.touched.password && formik.errors.password && (
                    <Typography color="error" variant="h4">
                      {formik.errors.password}
                    </Typography>
                  )}
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
