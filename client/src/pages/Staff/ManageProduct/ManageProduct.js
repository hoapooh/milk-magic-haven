import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { MainAPI } from '../../../API';
import { Button, Card, CardContent, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5, display: 'flex' }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

export default function ManageProduct() {
    const [productList, setProductList] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);
    const [show, setshow] = useState(null)
    const [showEditProduct, setShowEditProduct] = useState(false);
    const [proName, setProName] = useState('');
    const [prodes, setProdes] = useState('')
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [brandID, setbrandID] = useState('');
    const [country, setcountry] = useState('');
    const [range, setRange] = useState('');
    const [img, setImg] = useState('');
    const [editProductId, setEditProductId] = useState(null);
    const [showAdd, setShowAdd] = useState(false);

    const fetchData = () => {
        fetch(`${MainAPI}/product/get-all-product`, {
            method: "GET",
        })
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch data get product");
                return res.json();
            })
            .then(data => setProductList(data.data))
            .catch(error => console.error("Error fetching data product:", error));
    };

    useEffect(() => {
        fetchData();
    }, []);

    console.log(productList)

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - productList.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleShow = (index) => {
        setshow(show === index ? null : index)
    }

    const handleDelete = (productId) => {
        console.log(`Delete product with ID: ${productId}`);
        fetch(`${MainAPI}/product/delete-product/${productId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => {
                if (!response.ok) throw new Error("Failed to delete product");
                return response.json();
            })
            .then(data => {
                console.log(data);
                fetchData();
            })
            .catch(error => console.error("Error deleting product:", error));
    };

    const handleEditProductClick = (product) => {
        setEditProductId(product.product_id);
        setProName(product.product_name);
        setPrice(product.price);
        setImg(product.image_url)
        setStock(product.stock);
        setProdes(product.description)
        setbrandID(product.brand_id)
        setcountry(product.country_id)
        setRange(product.age_range)
        setShowEditProduct(true);
    };

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
                brand_id: brandID,
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
                fetchData();
                setProName('');
                setPrice('');
                setStock('');
                setcountry('');
                setRange('');
                setImg('');
                setbrandID('');
                setProdes('');
                setShowAdd(false);
            })
            .catch(error => console.error("Error adding product:", error));
    };

    const handleUpdateProduct = () => {
        if (!editProductId) return;

        console.log(editProductId)

        fetch(`${MainAPI}/product/update-product/${editProductId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                product_name: proName,
                product_price: price,
                product_description: prodes,
                image_url: img,
                stock: stock,
                brand_id: brandID,
                country_id: country,
                age_range: range,
            }),
        })
            .then(res => {
                if (!res.ok) throw new Error("Failed to update product");
                return res.json();
            })
            .then(data => {
                console.log(data);
                fetchData();
                setShowEditProduct(false);;
                setEditProductId(null);
            })
            .catch(error => console.error("Error updating product:", error));
    };

    return (
        <Box>

            <Box >
                <Button onClick={() => setShowAdd(true)} sx={{ border: '1px solid #49A1D7', marginTop: '10%', marginLeft: '30%', fontSize: '13px' }}>
                    Add New Product
                </Button>
            </Box>
            <Box ml={-30} mr={15} mb={-5}>
                {showAdd && (
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
                                    value={brandID}
                                    onChange={(event) => setbrandID(event.target.value)}
                                    margin="normal"
                                />
                                <TextField
                                    fullWidth
                                    label="Country"
                                    value={country}
                                    onChange={(event) => setcountry(event.target.value)}
                                    margin="normal"
                                />
                                <TextField
                                    fullWidth
                                    label="range"
                                    value={range}
                                    onChange={(event) => setRange(event.target.value)}
                                    margin="normal"
                                />
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
                                        onClick={() => setShowAdd(false)}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
                {showEditProduct && (
                    <div style={{ marginLeft: '10px' }}>
                        <Card className="edit-voucher" variant="outlined">
                            <CardContent>
                                <Typography variant="h4" component="div" gutterBottom>
                                    Edit Product
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
                                    value={brandID}
                                    onChange={(event) => setbrandID(event.target.value)}
                                    margin="normal"
                                />
                                <TextField
                                    fullWidth
                                    label="Country"
                                    value={country}
                                    onChange={(event) => setcountry(event.target.value)}
                                    margin="normal"
                                />
                                <TextField
                                    fullWidth
                                    label="range"
                                    value={range}
                                    onChange={(event) => setRange(event.target.value)}
                                    margin="normal"
                                />
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
                                        onClick={handleUpdateProduct}
                                        style={{ marginRight: '10px' }}
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => setShowEditProduct(false)}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </Box>
            <Box display="flex" justifyContent="center" mt={9} ml={-35} mr={9}>
                <TableContainer component={Paper} sx={{ width: '100%', mx: 'auto', mt: 0.5 }}>
                    <Table sx={{ minWidth: 1000, fontSize: '1.2rem' }} aria-label="custom pagination table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" sx={{ fontSize: '1.2rem' }}>Image</TableCell>
                                <TableCell align="center" sx={{ fontSize: '1.2rem' }}>Product Name</TableCell>
                                <TableCell align="center" sx={{ fontSize: '1.2rem' }}>Description</TableCell>
                                <TableCell align="center" sx={{ fontSize: '1.2rem' }}>Price</TableCell>
                                <TableCell align="center" sx={{ fontSize: '1.2rem' }}>Stock</TableCell>
                                <TableCell align="center" sx={{ fontSize: '1.2rem' }}>Brand ID</TableCell>
                                <TableCell align="center" sx={{ fontSize: '1.2rem' }}>Country ID</TableCell>
                                <TableCell align="center" sx={{ fontSize: '1.2rem' }}>Age Range</TableCell>
                                <TableCell align="center" sx={{ fontSize: '1.2rem' }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? productList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : productList
                            ).map((product, index) => (
                                <TableRow key={product.product_id}>
                                    <TableCell style={{ width: 300 }} align="center" sx={{ fontSize: '1.2rem' }}>
                                        <img src={product.image_url} alt="product" style={{ width: '70px', height: '90px' }} />
                                    </TableCell>
                                    <TableCell style={{ width: 260 }} align="center" sx={{ fontSize: '1.2rem' }}>
                                        {product.product_name}
                                    </TableCell>
                                    <TableCell style={{ width: 260 }} align="center" sx={{ fontSize: '1.2rem' }}>
                                        {product.description}
                                    </TableCell>
                                    <TableCell style={{ width: 260 }} align="center" sx={{ fontSize: '1.2rem' }}>
                                        {product.price}
                                    </TableCell>
                                    <TableCell style={{ width: 260 }} align="center" sx={{ fontSize: '1.2rem' }}>
                                        {product.stock}
                                    </TableCell>
                                    <TableCell style={{ width: 260 }} align="center" sx={{ fontSize: '1.2rem' }}>
                                        {product.brand_id}
                                    </TableCell>
                                    <TableCell style={{ width: 260 }} align="center" sx={{ fontSize: '1.2rem' }}>
                                        {product.country_id}
                                    </TableCell>
                                    <TableCell style={{ width: 260 }} align="center" sx={{ fontSize: '1.2rem' }}>
                                        {product.age_range}
                                    </TableCell>
                                    <TableCell style={{ width: 400 }} align="center" sx={{ fontSize: '1.2rem' }}>
                                        <Button onClick={() => handleShow(index)}>
                                            ▪▪▪
                                        </Button>

                                        {show === index &&
                                            <Box sx={{ display: 'flex' }}>
                                                <Button onClick={() => handleEditProductClick(product)}> <ModeEditIcon /></Button>
                                                <Button onClick={() => handleDelete(product.product_id)}> <DeleteIcon /> </Button>
                                            </Box>
                                        }
                                    </TableCell>
                                </TableRow>
                            ))}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={9} />
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[3]}
                                    colSpan={9}
                                    count={productList.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    slotProps={{
                                        select: {
                                            inputProps: {
                                                'aria-label': 'rows per page',
                                            },
                                            native: true,
                                        },
                                    }}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
}

