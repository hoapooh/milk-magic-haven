import React from 'react'
import './Product.css'
import { Typography, Box, Stack } from '@mui/material'
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import { listProduct } from './GetProduct';
import Grid from '@mui/material/Grid';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Container } from '@mui/material'

export default function Product() {

    const theme = createTheme({
        palette: {
            primary: blue,
            secondary: {
                main: '#f6a5c0',
            },
        },
    });

    return (
        <Container>
            <ThemeProvider theme={theme}>
                <Typography variant='h3' component='h3' align='center' mt={2}>
                    Top picks for your little ones
                </Typography>

                <Box mt={3} mb={5}>
                    <Stack direction="row" spacing={20} justifyContent='center' >
                        <Button variant="contained" sx={{ borderRadius: '20px', fontSize: '12px' }} color='secondary'>Feature</Button>
                        <Button variant="contained" sx={{ borderRadius: '20px', fontSize: '12px' }} color='secondary'>Best Seller</Button>
                        <Button variant="contained" sx={{ borderRadius: '20px', fontSize: '12px' }} color='secondary'>New Arrived</Button>
                    </Stack>
                </Box>

                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {listProduct.map((product, index) => (
                        <Grid item xs={2} sm={4} md={3} key={index}>
                            <div className='product_detail'>
                                <div style={{
                                    position: 'relative',
                                    top: '50%',
                                    left: '50%',
                                    display: 'flex',
                                    fontSize: '13px',
                                    cursor: 'pointer'
                                }}>
                                    <div style={{
                                        transform: 'translate(500%, 130%)',
                                    }}>
                                        <FavoriteBorderOutlinedIcon />
                                        <br />
                                        <ShoppingCartOutlinedIcon />
                                    </div>

                                    {
                                        product.sale === true &&
                                        <>
                                            <p style={{
                                                transform: 'translate(-250%, 240%)',
                                                width: '50px',
                                                maxHeight: '20px',
                                                border: '1px solid #F27373',
                                                textAlign: 'center',
                                                borderRadius: '10px',
                                                color: 'white',
                                                backgroundColor: '#F27373'
                                            }}>
                                                sale
                                            </p>
                                        </>
                                    }
                                </div>

                                <img src={product.img} alt={product.name} />
                            </div>

                            <div>
                                <div><p style={{ fontSize: '20px' }}>{product.name}</p></div>
                                <div>
                                    {product.reprice !== undefined &&
                                        <div>
                                            <span style={{ color: '#25BF0C', fontSize: '15px' }}>
                                                {product.reprice}&nbsp;&nbsp;
                                            </span>
                                            <span style={{ textDecoration: "line-through", fontSize: '12px', color: '#9d9999' }}>{product.price}</span>
                                        </div>
                                    }
                                    {product.reprice === undefined &&
                                        <span style={{ fontSize: '15px' }}>{product.price}</span>
                                    }
                                </div>

                                <div style={{ color: 'orange', fontSize: '20px' }}>{product.rate}</div>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            </ThemeProvider >
        </Container>
    )
}
