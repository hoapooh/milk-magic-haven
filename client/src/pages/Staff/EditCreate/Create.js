import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormControl,
} from "@mui/material";
import React, { useState } from "react";
import { MainAPI } from "../../../API";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

export default function Create() {
  const nav = useNavigate();

  const urlRegex =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

  const formik = useFormik({
    isDirtyForm: true,
    initialValues: {
      proName: "",
      prodes: "",
      price: "",
      stock: "",
      brandname: "",
      country: "",
      range: "",
      img: "",
    },

    onSubmit: (values) => {
      handleAddProduct();
      console.log(values);
    },

    validationSchema: Yup.object({
      proName: Yup.string()
        .required("Required.")
        .min(2, "Must be 2 characters or more"),
      prodes: Yup.string()
        .required("Required.")
        .min(2, "Must be 2 characters or more"),
      price: Yup.number().required("Required."),
      stock: Yup.number().required("Required."),
      brandname: Yup.number().required("Required."),
      country: Yup.string()
        .required("Required.")
        .min(2, "Must be 2 characters or more"),
      img: Yup.string().required("Required.").matches(urlRegex, "Invalid URL"),
    }),
  });

  const handleAddProduct = () => {
    axios
      .post(
        `${MainAPI}/product/add-product`,
        {
          product_name: formik.values.proName,
          product_price: formik.values.price,
          product_description: formik.values.prodes,
          image_url: formik.values.img,
          stock: formik.values.stock,
          brand_id: formik.values.brandname,
          country_id: formik.values.country,
          age_range: formik.values.range,
        },
        {
          headers: {
            "x-access-token": localStorage.getItem("accessToken"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        toast.success("Product added successfully");
        setTimeout(() => {
          nav("/staff/manageproduct");
        }, 2000);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast.error(error.response.data.message);
      });
  };

  const handleCancel = () => {
    nav("/staff/manageproduct");
  };

  return (
    <Container>
      <ToastContainer />
      <Box mt="3%">
        <div style={{ marginLeft: "10px" }}>
          <Card className="edit-voucher" variant="outlined">
            <CardContent>
              <Typography variant="h4" component="div" gutterBottom>
                Add New Product
              </Typography>
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  fullWidth
                  label="Product Name"
                  value={formik.proName}
                  name="proName"
                  onChange={formik.handleChange}
                  margin="normal"
                />
                {formik.touched.proName && formik.errors.proName && (
                  <Typography color="error" variant="h4">
                    {formik.errors.proName}
                  </Typography>
                )}
                <TextField
                  fullWidth
                  label="Description"
                  value={formik.prodes}
                  name="prodes"
                  onChange={formik.handleChange}
                  margin="normal"
                />
                {formik.touched.prodes && formik.errors.prodes && (
                  <Typography color="error" variant="h4">
                    {formik.errors.prodes}
                  </Typography>
                )}
                <TextField
                  fullWidth
                  label="Price"
                  type="number"
                  value={formik.price}
                  name="price"
                  onChange={formik.handleChange}
                  margin="normal"
                />
                {formik.touched.price && formik.errors.price && (
                  <Typography color="error" variant="h4">
                    {formik.errors.price}
                  </Typography>
                )}
                <TextField
                  fullWidth
                  label="Stock"
                  type="number"
                  value={formik.stock}
                  name="stock"
                  onChange={formik.handleChange}
                  margin="normal"
                />
                {formik.touched.stock && formik.errors.stock && (
                  <Typography color="error" variant="h4">
                    {formik.errors.stock}
                  </Typography>
                )}
                <TextField
                  fullWidth
                  label="Brand ID"
                  type="number"
                  value={formik.brandname}
                  name="brandname"
                  onChange={formik.handleChange}
                  margin="normal"
                />
                {formik.touched.brandname && formik.errors.brandname && (
                  <Typography color="error" variant="h4">
                    {formik.errors.brandname}
                  </Typography>
                )}
                <TextField
                  fullWidth
                  label="Country"
                  value={formik.country}
                  name="country"
                  onChange={formik.handleChange}
                  margin="normal"
                />
                {formik.touched.country && formik.errors.country && (
                  <Typography color="error" variant="h4">
                    {formik.errors.country}
                  </Typography>
                )}
                <Box
                  sx={{
                    minWidth: 120,
                    marginTop: "15px",
                    marginBottom: "10px",
                  }}
                >
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Age Range
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={formik.range}
                      name="range"
                      label="Age Range"
                      onChange={formik.handleChange}
                    >
                      <MenuItem value={"> 2 years old"}>
                        &gt; 2 years old
                      </MenuItem>
                      <MenuItem value={"0-1 year"}>0-1 year</MenuItem>
                      <MenuItem value={"1-2 years"}>1-2 years</MenuItem>
                      <MenuItem value={"Adult"}>Adult</MenuItem>
                      <MenuItem value={"Maternal"}>Maternal</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <TextField
                  fullWidth
                  label="Url_Image"
                  value={formik.img}
                  name="img"
                  onChange={formik.handleChange}
                  margin="normal"
                />
                {formik.touched.img && formik.errors.img && (
                  <Typography color="error" variant="h4">
                    {formik.errors.img}
                  </Typography>
                )}
                <div style={{ marginTop: "10px" }}>
                  <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    style={{ marginRight: "10px" }}
                  >
                    Add
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </Box>
    </Container>
  );
}
