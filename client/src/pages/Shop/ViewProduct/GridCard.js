import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import Products from "../Products/Products";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

export default function GridCard({ products }) {
  return (
    <>
      <Grid container spacing={2}>
        {products.map((product) => {
          return (
            <Grid item xs={6} md={4} key={product.id}>
              <Card sx={{ maxWidth: 345 }}>
                <Box justifyContent={"end"} display={"flex"}>
                  {product.sale && (
                    <Box
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <Button
                        style={{
                          height: 25,
                          backgroundColor: "#F27373",
                          color: "white",
                        }}
                        size="small"
                        variant="contained"
                      >
                        Sale
                      </Button>
                    </Box>
                  )}
                  <CardActions>
                    <IconButton aria-label="add to favorites">
                      <FavoriteBorderIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                      <ShoppingCartOutlinedIcon />
                    </IconButton>
                  </CardActions>
                </Box>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.image}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom component="div">
                      {product.name}
                    </Typography>
                    {!product.sale ? (
                      <Typography gutterBottom component="div">
                        {product.originPrice}
                      </Typography>
                    ) : (
                      <Box display={"flex"}>
                        <Typography
                          gutterBottom
                          component="div"
                          color={"green"}
                        >
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
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
