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
        },
        body: JSON.stringify({
          product_name: proName,
          product_price: price,
          product_description: prodes,
          image_url: img,
          stock: stock,
          brand_id: brandname,
          country_id: country,
          age_range: range,
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
        {
          <div style={{ marginLeft: "10px" }}>
            <Card className="edit-voucher" variant="outlined">
              <CardContent>
                <Typography variant="h4" component="div" gutterBottom>
                  Edit Product
                </Typography>
                <TextField
                  fullWidth
                  label="Product Name"
                  value={proName}
                  onChange={(event) => setProName(event.target.value)}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Description"
                  value={prodes}
                  onChange={(event) => setProdes(event.target.value)}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Price"
                  type="number"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Stock"
                  type="number"
                  value={stock}
                  onChange={(event) => setStock(event.target.value)}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Brand Name"
                  value={brandname}
                  onChange={(event) => setBrandName(event.target.value)}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Country"
                  value={country}
                  onChange={(event) => setCountry(event.target.value)}
                  margin="normal"
                />
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
                      defaultValue={range}
                      label="range"
                      onChange={handleChange}
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
                  label="Image URL"
                  value={img}
                  onChange={(event) => setImg(event.target.value)}
                  margin="normal"
                />
                <div style={{ marginTop: "10px" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpdateProduct}
                    style={{ marginRight: "10px" }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleCancel()}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        }
      </Box>
    </Container>
  );
}
