import React from "react";
import SliderStaff from "./SliderStaff";
import { Route, Routes } from "react-router-dom";
import ManageProduct from "./ManageProduct/ManageProduct";
import { Grid } from "@mui/material";
import ManageUser from "./ManageUser/ManageUser";
import ManageOrder from "./ManageOrder/ManageOrder";
import ManagePost from "./ManagePost/ManagePost";
import ManageVoucher from "./ManageVoucher/ManageVoucher";
import CreatePost from "./ManagePost/CreatePost";
import UpdatePost from "./ManagePost/UpdatePost";

export default function Staff() {
  return (
    <>
      <Grid container spacing={10}>
        <Grid item md={2}>
          <SliderStaff />
        </Grid>
        <Grid
          item
          md={10}
          display="flex"
          justifyContent="center"
          alignItems={"center"}
          flexDirection="column"
          sx={{ width: "90%", marginTop: "30px" }}
        >
          <Routes>
            <Route path="/manageproduct" element={<ManageProduct />}></Route>
            <Route path="/managepost" element={<ManagePost />}></Route>
            <Route path="/managevoucher" element={<ManageVoucher />}></Route>
            <Route path="/manageorder" element={<ManageOrder />}></Route>
            <Route path="/manageuser" element={<ManageUser />}></Route>
            <Route
              path="/managepost/create-post"
              element={<CreatePost />}
            ></Route>
            <Route
              path="/managepost/edit-post/:id"
              element={<UpdatePost />}
            ></Route>
          </Routes>
        </Grid>
      </Grid>
    </>
  );
}
