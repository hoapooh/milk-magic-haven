import React from 'react'
import SliderStaff from './SliderStaff'
import { Route, Routes } from 'react-router-dom'
import ManageProduct from './ManageProduct/ManageProduct'
import { Grid } from '@mui/material'

export default function Staff() {
    return (
        <>
            <Grid container spacing={1}>
                <Grid item md={5}>
                    <SliderStaff />
                </Grid>
                <Grid item md={7}>
                    <Routes>
                        <Route path='/manageproduct' element={<ManageProduct />} />
                    </Routes>
                </Grid>
            </Grid>
        </>
    )
}
