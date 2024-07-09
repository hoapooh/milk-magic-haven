import { Box, Button, Card, CardContent, Container, InputLabel, MenuItem, Select, TextField, Typography, FormControl } from '@mui/material';
import React, { useState } from 'react';
import { MainAPI } from '../../../API';
import { useNavigate } from 'react-router-dom';

export default function Create() {
    const nav = useNavigate();
    const [proName, setProName] = useState('');
    const [prodes, setProdes] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [brandname, setBrandName] = useState('');
    const [country, setCountry] = useState('');
    const [range, setRange] = useState('');
    const [img, setImg] = useState('');

    const handleAddProduct = () => {
        fetch(`${MainAPI}/product/add-product`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                product_name: proName,
                product_price: price,
                product_description: prodes,
                image_url: img,
                stock: stock,
                brand_id: brandname,
                country_id: country,
                age_range: range,
            }),
        })
            .then(res => {
                if (!res.ok) throw new Error("Failed to add product");
                return res.json();
            })
            .then(data => {
                console.log(data);
                nav('/staff/product');
            })
            .catch(error => console.error("Error adding product:", error));
    };

    const handleChange = (event) => {
        setRange(event.target.value);
    };

    const handleCancel = () => {
        nav('/staff/product');
    };

    return (
        <Container>
            <Box mt='3%'>
                <div style={{ marginLeft: '10px' }}>
                    <Card className="edit-voucher" variant="outlined">
                        <CardContent>
                            <Typography variant="h4" component="div" gutterBottom>
                                Add New Product
                            </Typography>
                            <TextField
                                fullWidth
                                label="Product Name"
                                value={proName}
                                onChange={(event) => setProName(event.target.value)}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Description"
                                value={prodes}
                                onChange={(event) => setProdes(event.target.value)}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Price"
                                type="number"
                                value={price}
                                onChange={(event) => setPrice(event.target.value)}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Stock"
                                type="number"
                                value={stock}
                                onChange={(event) => setStock(event.target.value)}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Brand ID"
                                type="number"
                                value={brandname}
                                onChange={(event) => setBrandName(event.target.value)}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Country"
                                value={country}
                                onChange={(event) => setCountry(event.target.value)}
                                margin="normal"
                            />
                            <Box sx={{ minWidth: 120, marginTop: '15px', marginBottom: '10px' }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Age Range</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={range}
                                        label="Age Range"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={"> 2 years old"}>&gt; 2 years old</MenuItem>
                                        <MenuItem value={"0-1 year"}>0-1 year</MenuItem>
                                        <MenuItem value={"1-2 years"}>1-2 years</MenuItem>
                                        <MenuItem value={"Adult"}>Adult</MenuItem>
                                        <MenuItem value={"Maternal"}>Maternal</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <TextField
                                fullWidth
                                label="Url_Image"
                                value={img}
                                onChange={(event) => setImg(event.target.value)}
                                margin="normal"
                            />
                            <div style={{ marginTop: '10px' }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleAddProduct}
                                    style={{ marginRight: '10px' }}
                                >
                                    Add
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </Box>
        </Container>
    );
}


