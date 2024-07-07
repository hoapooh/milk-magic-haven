import React, { useContext } from "react";
import { MdDelete } from "react-icons/md";
import {
    Button,
    Container,
    Typography,
    Box,
    Card,
    CardContent,
    IconButton,
    Grid,
    Divider,
} from "@mui/material";
import { CartContext } from '../../components/Context/CartContext/CartContext'

export default function Cart() {
    const {
        cartList,
        handleDeleteCart,
        decrementQuantity,
        incrementQuantity,
    } = useContext(CartContext);

    return (
        <Container>
            {cartList.length === 0 ? (
                <Box sx={{ textAlign: "center", mt: 4 }}>
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2Fcart-empty.png?alt=media&token=e796d2a1-62c9-4415-a878-c88499ed01e7"
                        alt="cart"
                    />
                    <Typography variant="h5" mt={2}>
                        Hiện chưa có sản phẩm nào trong giỏ hàng
                    </Typography>
                </Box>
            ) : (
                <Box mt={4}>
                    <Typography variant="h4" mb={2}>
                        Danh sách đơn hàng
                    </Typography>
                    <Grid container spacing={2}>
                        {cartList.map((product) => (
                            <Grid item xs={12} key={product.id}>
                                <Card sx={{ display: "flex", alignItems: "center" }}>
                                    <CardContent sx={{ flex: 1 }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={3}>
                                                <img
                                                    src={product.image_url}
                                                    alt={product.name}
                                                    style={{ maxWidth: "100%", height: "auto" }}
                                                />
                                            </Grid>
                                            <Grid item xs={9}>
                                                <Typography variant="h6" gutterBottom>
                                                    {product.description}
                                                </Typography>
                                                <Typography variant="body1" gutterBottom>
                                                    Đơn giá: {product.price} VNĐ
                                                </Typography>
                                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                                    <Button
                                                        variant="contained"
                                                        size="small"
                                                        onClick={() => decrementQuantity(product)}
                                                    >
                                                        -
                                                    </Button>
                                                    <Typography variant="body1" sx={{ mx: 2 }}>
                                                        {product.quantity}
                                                    </Typography>
                                                    <Button
                                                        variant="contained"
                                                        size="small"
                                                        onClick={() => incrementQuantity(product)}
                                                    >
                                                        +
                                                    </Button>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                    <Divider orientation="vertical" flexItem />
                                    <CardContent sx={{ display: "flex", alignItems: "center" }}>
                                        <Typography variant="h6">
                                            Thành tiền: {product.price * product.quantity} VNĐ
                                        </Typography>
                                        <IconButton
                                            onClick={() => handleDeleteCart(product)}
                                            sx={{ ml: 2 }}
                                        >
                                            <MdDelete />
                                        </IconButton>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}
        </Container>
    );
}
