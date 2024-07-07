import React from 'react';
import Cart from './Cart';
import CartUser from './CartUser';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Container, Grid } from '@mui/material';
import AuthNav from '../../components/AuthNav/AuthNav';

export default function CartItem() {
    return (
        <>
            <AuthNav />
            <Header />
            <Container>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={9}>
                        <Cart />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <CartUser />
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    );
}
