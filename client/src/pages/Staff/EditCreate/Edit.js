import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MainAPI } from "../../../API";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Edit() {
  const { id } = useParams();
  const [edit, setEdit] = useState({});
  const nav = useNavigate();
  const [proName, setProName] = useState("");
  const [prodes, setProdes] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [brandname, setBrandName] = useState("");
  const [country, setCountry] = useState("");
  const [range, setRange] = useState("");
  const [img, setImg] = useState("");

  const urlRegex =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

  const formik = useFormik({
    isDirtyForm: true,
    initialValues: {
      proName: proName,
      prodes: prodes,
      price: price,
      stock: stock,
      brandname: brandname,
      country: country,
      range: range,
      img: img,
    },

    onSubmit: (values) => {
      handleUpdateProduct();
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

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${MainAPI}/product/get-product-by-id/${id}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) throw new Error("Failed to get data to edit");
      const data = await response.json();
      const product = data.product;
      setEdit(product);
      setProName(product.product_name);
      setProdes(product.description);
      setPrice(product.price);
      setStock(product.stock);
      setBrandName(product.brand_name);
      setCountry(product.country_name);
      setRange(product.age_range);
      setImg(product.image_url);
    } catch (error) {
      console.log("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateProduct = async () => {
    try {
      const response = await fetch(`${MainAPI}/product/update-product/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("accessToken"),
        },
        body: JSON.stringify({
          product_name: formik.values.proName,
          product_price: formik.values.price,
          product_description: formik.values.prodes,
          image_url: formik.values.img,
          stock: formik.values.stock,
          brand_id: formik.values.brandname,
          country_id: formik.values.country,
          age_range: formik.values.range,
        }),
      });
      if (!response.ok) throw new Error("Failed to update product");
      const data = await response.json();
      console.log(data);
      toast.success("Product updated successfully");
      setTimeout(() => {
        nav("/staff/manageproduct");
      }, 2000);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  console.log(edit);

  const handleCancel = () => {
    nav("/staff/manageproduct");
  };

  const handleChange = (event) => {
    setRange(event.target.value);
  };

  return (
    <Container>
      <ToastContainer />
      <Box mt="3%">
        <div style={{ marginLeft: "10px" }}>
          <Card className="edit-voucher" variant="outlined">
            <CardContent>
              <Typography variant="h4" component="div" gutterBottom>
                Edit Product
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
                    Update
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
