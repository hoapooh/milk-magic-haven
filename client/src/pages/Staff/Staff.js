import React from 'react'
import SliderStaff from './SliderStaff'
import { Route, Routes } from 'react-router-dom'
import ManageProduct from './ManageProduct/ManageProduct'
import { Grid } from '@mui/material'
import ManageUser from './ManageUser/ManageUser'
import ManageOrder from './ManageOrder/ManageOrder'
import ManagePost from './ManagePost/ManagePost'
import ManageVoucher from './ManageVoucher/ManageVoucher'

export default function Staff() {
    return (
        <>
            <Grid container spacing={1}>
                <Grid item md={5}>
                    <SliderStaff />
                </Grid>
                <Grid item md={7}>
                    <Routes>
                        <Route path='/manageproduct' element={<ManageProduct />}></Route>
                        <Route path='/managepost' element={<ManagePost />}></Route>
                        <Route path='/managevoucher' element={<ManageVoucher />}></Route>
                        <Route path='/manageorder' element={<ManageOrder />} ></Route>
                        <Route path='/manageuser' element={<ManageUser />}></Route>
                    </Routes>
                </Grid>
            </Grid>
        </>
    )
}
