import React, { useEffect, useState } from "react";
import "./ViewContact.scss";
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../admin/sidebar/Sidebar";
import axios from "axios";

export default function ViewContact() {
  // const baseURL = "http://localhost:8000/admin/get-all-contact";
  const [API, setAPI] = useState([]);

  // const fetchContact = async () => {
  //   try {
  //     const response = await axios.get(baseURL, {
  //       headers: {
  //         "x-access-token": localStorage.getItem("accessToken"),
  //       },
  //     });
  //     console.log(response);
  //     setAPI(response.data);
  //   } catch (error) {
  //     console.log("Error: ", error);
  //   }
  // };
  // console.log(API);
  // useEffect(() => {
  //   fetchContact();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/admin/get-all-contact");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setAPI(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="ViewContact">
      <ToastContainer />
      <Grid container spacing={2}>
        <Grid item md={2}>
          <Sidebar />
        </Grid>
        <Grid item md={10}>
          <div className="ViewContact__content">
            <h1 className="ViewContact__title">Xem nhận xét</h1>

            <TableContainer component={Paper} className="table__container">
              <Table className="admin__table" aria-label="simple table">
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
                  {/* {usersAPI.map(
                    (user) =>
                      user.status && (
                        <TableRow>
                          <TableCell>{user.username}</TableCell>
                          <TableCell>{user.password}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.role_id}</TableCell>
                          <TableCell className="call-to-action">
                            <Link to={`/update/${user.user_id}`}>
                              <button className="action-btn edit">
                                <MdEdit />
                              </button>
                            </Link>
                            <button className="action-btn trash" onClick={() => handleDelete(user.user_id)}>
                              <FaTrashAlt />
                            </button>
                          </TableCell>
                        </TableRow>
                      )
                  )} */}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
