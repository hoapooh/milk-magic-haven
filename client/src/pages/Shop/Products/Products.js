import React from "react";
import "./Products.css";
import { Container, Grid } from "@mui/material";
import ProductCategory from "../ProductCategory/ProductCategory";
import ProductList from "../ProductList/ProductList";

export default function Products() {
  return (
    <Container>
      <Grid container columnSpacing={20} marginTop={2}>
        <Grid item md={3} xs={12}>
          <ProductCategory />
        </Grid>
        <Grid item md={9} xs={12}>
          <ProductList />
        </Grid>
      </Grid>
    </Container>
  );
}
