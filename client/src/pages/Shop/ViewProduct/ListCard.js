import {
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import "./ListCard.css";

export default function ListCard({ products }) {
  return (
    <>
      {products.map((product) => {
        return (
          <Card sx={{ display: "flex", margin: 2, boxShadow: "none" }}>
            <Grid container spacing={2}>
              <Grid item md={3} xs={12}>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <CardMedia
                    component="img"
                    sx={{ width: 200 }}
                    image={product.image}
                    alt="Live from space album cover"
                    style={{
                      border: "1px solid gray",
                      borderRadius: "15px",
                      width: "100%",
                    }}
                  />
                </Box>
              </Grid>

              <Grid item md={9} xs={12}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    L{product.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    {product.description}
                  </Typography>
                  {!product.sale ? (
                    <Typography gutterBottom component="div">
                      {product.originPrice}
                    </Typography>
                  ) : (
                    <Box display={"flex"}>
                      <Typography gutterBottom component="div" color={"green"}>
                        {product.salePrice}
                      </Typography>
                      <Typography
                        gutterBottom
                        component="div"
                        fontSize={13}
                        style={{
                          textDecoration: "line-through",
                          marginLeft: 5,
                          color: "gray",
                        }}
                      >
                        {product.originPrice}
                      </Typography>
                    </Box>
                  )}
                  <Typography gutterBottom component="div">
                    <Rating name="read-only" value={product.rate} readOnly />
                  </Typography>
                  <Box>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#0f83b2", marginRight: 20 }}
                    >
                      <ShoppingCartOutlinedIcon /> Add to cart
                    </Button>
                    <IconButton aria-label="add to favorites">
                      <FavoriteBorderIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        );
      })}
    </>
  );
}
