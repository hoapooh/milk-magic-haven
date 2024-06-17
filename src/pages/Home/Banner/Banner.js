import React from 'react'
import './Banner.css'
import Grid from '@mui/material/Grid';
import { Box, Typography, Button } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { yellow, pink } from '@mui/material/colors';
import { Container } from '@mui/material'


export default function Banner() {
    const theme = createTheme({
        palette: {
            primary: yellow,
            secondary: pink,
        },
    });

    return (
        <Container>
            <ThemeProvider theme={theme}>
                <Grid container spacing={4} mt={5}>
                    <Grid item md={6} sx={{ maxHeight: '400px' }}>
                        <div className='banner'>
                            <img src='https://s3-alpha-sig.figma.com/img/d8d2/389e/8f55155e9fc1c3f9e6852bc30a18586b?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SCFQt43ILOwLqkFxL2u3csn~tVi4oMX0BFgXtFQezsjA0y31GGg6Z-xpwu97VK79KKslPhILsDWQmPA9XR0Vnzq~i-I0dOX0fZT6odIjm6zjlxq0WHvBF97vnaM2mbzyb-ZKEimBbwdwmlceBWAFOn2mv1PgjsRGofhN9Oafl-kv105mHm7uKRonTlvmWkNNjFcFCDd0BCfnZsvhM4eI5TTjotTVysLb34FSIPSH9tU6H77Hvz~OrjCAF9NpGHmErYnhYGbEtKPBVB1zIo4apLZvHPjzBm1gjelIwKGgKcYhI6xCRROCZIW28pWkZnbNzudzL0zQ2-DQPGaqlCP~SQ__' alt='adv' />

                            <svg xmlns="http://www.w3.org/2000/svg" width="331" height="178" viewBox="0 0 331 178" fill="none">
                                <path d="M326.14 144.826C326.14 144.826 324.201 166.159 271.406 176.808C250.486 181.03 63.0232 173.015 38.4722 168.821C-28.4512 157.389 6.52898 33.2706 34.4275 16.4099C62.326 -0.450655 192.328 -1.5599 240.857 1.1023C291.374 3.87542 320.605 18.8503 328.108 72.538C335.61 126.226 326.147 144.826 326.147 144.826H326.14Z" fill="white" />
                            </svg>

                            <Typography variant='h2' component='h2'
                                sx={{
                                    position: 'relative',
                                    top: '50 %',
                                    left: '50 %',
                                    transform: 'translate(33%, -450%)',
                                    color: '#1096B5',
                                    fontFamily: "Chalkboard SE"
                                }}
                            >
                                Discover the <br /> Joy of Play
                            </Typography>
                        </div>

                    </Grid>
                    <Grid item md={6} sx={{ maxHeight: '400px' }}>
                        <div className='banner'>
                            <img src='https://s3-alpha-sig.figma.com/img/4092/8e39/b8bbe162327a7a85b43c1bb61fa6ce6b?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ON9PxmByoEtRM3~i2~MQbHOCwce8W60XjqgWhCUy9o3YENIh3-mA1o-SFL6haN2n8P0c87FAMppEFzckXFU2s7Nex~zJnZrEDJXYWct6WreeX7zbdIImrffBe-L86cEyCiRua7pVuc8eHxbffNIiOhM1rFyIsjFTzRCGtzrltIVa9Y-izOXiieCGKMGAbDSTENYjky-jdnUlu6XG87HfeW8w70WCqAv~IgGmPDsE4J9ahuJ2~F7FfsG1MsJuJTpbsVqY1D8UTROHTnszhCPt3MsfORzfrpRgsiw9BsJYPeSryaOU1LyRO0M6WP14Fa29DmSSyuz-o7u9DOAfWLimiw__' alt='adv' />
                        </div>

                        <Box
                            sx={{
                                position: 'relative',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-5%, -320%)',
                                color: '#1096B5',
                                fontFamily: "Baloo Bhaina 2",
                                width: '480px'
                            }}
                        >
                            <Typography
                                variant="h4"
                                component="h4"
                                sx={{
                                    fontFamily: "Chalkboard SE",
                                    color: '#1096B5'
                                }}
                            >
                                Eco - Friendly Toys
                            </Typography >

                            <Typography
                                variant='h5'
                                mt={2}
                                sx={{
                                    width: "270px",
                                    color: 'black'
                                }}
                            >
                                Flash sale 30%, Extra discount for loyal customers
                            </Typography>

                            <Box
                                mt={3}
                            >
                                <Button
                                    variant="contained"
                                    sx={{
                                        padding: '10px 20px',
                                        borderRadius: '20px',
                                        fontSize: '12px',
                                        fontWeight: 'bold',
                                        color: 'black'
                                    }}
                                >
                                    Shop Now
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </Container >
    )
}
