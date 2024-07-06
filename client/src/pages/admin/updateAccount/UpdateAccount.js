import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Sidebar from "../sidebar/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { notification } from "antd";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import "./UpdateAccount.scss";

export default function UpdateAccount() {
  const { user_id } = useParams();
  const navigate = useNavigate();
  const [oldData, setOldData] = useState(null);

  const baseURL = `http://localhost:8000/user/get-all-user/${user_id}`;

  useEffect(() => {
    fetch(baseURL)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched users data:", data);
        setOldData(data.data);
      })
      .catch((error) => console.log(error));
  }, []);
  const formik = useFormik({
    initialValues: {
      username: oldData?.username,
      email: oldData?.email,
      password: oldData?.password,
      role_id: oldData?.role_id,
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
    enableReinitialize: true,
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email format").required("Required"),
      password: Yup.string().required("Required"),
      role_id: Yup.string().required("Required"),
    }),
  });
  return (
    <div className="UpdateAccount">
      <Grid container spacing={2}>
        <Grid item md={2}>
          <Sidebar />
        </Grid>
        <Grid item md={10}>
          <div className="UpdateAccount__content">
            <h1 className="UpdateAccount__title">Update account</h1>
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
                      {formik.touched.username && formik.errors.username && (
                        <Alert variant="warning">{formik.errors.username}</Alert>
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
                      {formik.touched.email && formik.errors.email && (
                        <Alert variant="warning">{formik.errors.email}</Alert>
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
                      {formik.touched.password && formik.errors.password && (
                        <Alert variant="warning">{formik.errors.password}</Alert>
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
                        <option value="Admin">Admin</option>
                        <option value="Customer">Customer</option>
                        <option value="Staff">Staff</option>
                      </Form.Select>
                      {formik.touched.role_id && formik.errors.role_id && (
                        <Alert variant="warning">{formik.errors.role_id}</Alert>
                      )}
                    </Form.Group>
                    <Form.Group>
                      <Button type="submit" className="button">
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
