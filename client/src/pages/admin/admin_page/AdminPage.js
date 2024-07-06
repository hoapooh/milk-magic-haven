import React, { useEffect, useState } from "react";
import "./AdminPage.css";
import Sidebar from "../sidebar/Sidebar";
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminPage() {
  const baseURL = "http://localhost:8000/user/get-all-user";
  const [usersAPI, setUsersAPI] = useState([]);

  useEffect(() => {
    fetch(baseURL)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched users data:", data);
        setUsersAPI(data.data);
      })
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
      fetch(`http://localhost:8000/admin/delete-user/${user_id}`, { method: "DELETE" })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP Status: ${response.status}`);
          }
          toast.success("Xóa người dùng thành công");
          fetchAccount();
        })
        .catch((error) => console.log("Delete failed: ", error));
    }
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
                  {usersAPI.map(
                    (user) =>
                      user.status && (
                        <TableRow key={user.user_id}>
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
