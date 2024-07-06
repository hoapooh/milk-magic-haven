import React from "react";
import { Grid } from "@mui/material";
import Sidebar from "../sidebar/Sidebar";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import "./AddAccount.scss";
import { notification } from "antd";

export default function AddAccount() {
  const baseURL = `http://localhost:8000/admin/create-user`;
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      role_id: "",
    },
    onSubmit: (values) => {
      fetch(baseURL, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP Status: ${response.status}`);
          }
          return response.json();
        })
        .then(() => {
          notification.success({
            message: "Successfully",
            description: "Add new account successfully",
          });
          setTimeout(() => {
            navigate("/admin");
          }, 3000);
        });
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email format").required("Required"),
      password: Yup.string().required("Required"),
      role_id: Yup.string().required("Required"),
    }),
  });

  return (
    <div className="AddAccount">
      <Grid container spacing={2}>
        <Grid item md={2}>
          <Sidebar />
        </Grid>
        <Grid item md={10}>
          <div className="AddAccount__content">
            <h1 className="AddAccount__title">Thêm tài khoản</h1>
            <Container className="container">
              <ToastContainer className="ToastContainer" />
              <Row className="justify-content-md-center">
                <Col md={8}>
                  <Form onSubmit={formik.handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        className="form-control"
                      />
                      {formik.errors.username && (
                        <Alert variant="warning" className="alert-warning">
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
                        className="form-control"
                      />
                      {formik.errors.email && (
                        <Alert variant="warning" className="alert-warning">
                          {formik.errors.email}
                        </Alert>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        className="form-control"
                      />
                      {formik.errors.password && (
                        <Alert variant="warning" className="alert-warning">
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
                        <option value="">Open this select menu</option>
                        <option value="admin">Admin</option>
                        <option value="customer">Customer</option>
                        <option value="staff">Staff</option>
                      </Form.Select>
                      {formik.errors.role_id && (
                        <Alert variant="warning" className="alert-warning">
                          {formik.errors.role_id}
                        </Alert>
                      )}
                    </Form.Group>
                    <div className="add_button">
                      <Form.Group>
                        <Button type="submit" className="submit-button">
                          Add
                        </Button>
                      </Form.Group>
                    </div>
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
