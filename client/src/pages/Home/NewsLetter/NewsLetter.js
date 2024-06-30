import { Button, Typography } from '@mui/material'
import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/material'

export default function NewsLetter() {
    return (
        <Container>
            <Typography variant='h3' component='h3' mt={5} align='center'
                sx={{
                    fontFamily: "Chalkboard SE",
                }}
            >
                Newsletter
            </Typography>

            <Box mb={5}>
                <Typography sx={{
                    fontFamily: 'Comfortaa',
                    fontSize: '15px',
                }} align='center' width={450} m='0 auto'>
                    Get 15% off your first purchase! Plus, be the first to know about sales, new product launches, and exclusive offers!
                </Typography >
            </Box >

            <Box
                width={500}
                m='0 auto'
                sx={{ display: 'flex', gap: 2, borderRadius: '20px' }}
            >
                <TextField sx={{ borderRadius: '20px' }} id="outlined-basic" label="Enter your email" variant="outlined" fullWidth />
                <Button sx={{ borderRadius: '20px' }} variant="contained">Join</Button>
            </Box>
        </Container>
    )
}
