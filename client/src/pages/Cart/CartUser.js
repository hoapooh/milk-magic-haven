// import React, { useContext, useState } from "react";
// import {
//     Box,
//     Button,
//     Typography,
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogTitle,
// } from "@mui/material";

// export default function CartUser() {
//     /* USESTATE */
//     const [show, setShow] = useState(false);
//     const [listOfVoucherById, setListOfVoucherById] = useState([]);
//     const [isUsedVoucher, setIsUsedVoucher] = useState(false);
//     const [orderItem, setOrderItem] = useState({
//         user_id: "",
//         total_amount: 0,
//         orderItems: [],
//     });
//     const [temporary, setTemporary] = useState(0);
//     const [discount, setDiscount] = useState(0);
//     const [total, setTotal] = useState(0);

//     /* USECONTEXT */
//     const { orderInfomation, setOrderInfomation } = useOrder();
//     const { cartList } = useContext(CartContext);
//     const { auth } = useAuth();

//     const nav = useNavigate();

//     /* USEEFFECT GET VOUCHER BY USER ID */
//     // useEffect(() => {
//     //     axios
//     //         .get(`${MainAPI}/user/show-voucher-by-user/${auth.user.user_id}`, {
//     //             headers: {
//     //                 "x-access-token": JSON.parse(localStorage.getItem("accessToken")),
//     //             },
//     //         })
//     //         .then((res) => {
//     //             setListOfVoucherById(res.data.vouchers.vouchers);
//     //         })
//     //         .catch((err) => {
//     //             console.log(err);
//     //         });
//     // }, [auth.user.user_id]);

//     // const handleCalculate = () => {
//     //     const temporaryTemp = cartList.reduce((total, item) => {
//     //         return total + item.price * item.quantity;
//     //     }, 0);

//     //     let discountTemp = orderInfomation.discount * temporaryTemp;
//     //     if (isNaN(discountTemp)) {
//     //         discountTemp = 0;
//     //     }

//     //     const totalTemp = temporaryTemp - discountTemp;

//     //     setOrderItem({
//     //         ...orderItem,
//     //         total_amount: totalTemp,
//     //         user_id: auth.user.user_id,
//     //         orderItems: cartList,
//     //     });

//     //     return { temporaryTemp, discountTemp, totalTemp };
//     // };

//     // useEffect(() => {
//     //     const { temporaryTemp, discountTemp, totalTemp } = handleCalculate();

//     //     setTemporary(temporaryTemp);
//     //     setDiscount(discountTemp);
//     //     setTotal(totalTemp);

//     //     setOrderInfomation({
//     //         ...orderInfomation,
//     //         temporary: temporaryTemp,
//     //         total: totalTemp,
//     //     });
//     // }, [cartList, orderInfomation.discount, handleCalculate]);

//     const handleClick = () => {
//         //     axios
//         //         .post(`${MainAPI}/user/ready-to-checkout`, orderItem, {
//         //             headers: {
//         //                 "x-access-token": JSON.parse(localStorage.getItem("accessToken")),
//         //             },
//         //         })
//         //         .then((res) => {
//         //             setOrderInfomation({
//         //                 ...orderInfomation,
//         //                 order_id: res.data.order_id,
//         //             });
//         //             nav("/order-payment");
//         //         })
//         //         .catch((err) => {
//         //             console.log(err);
//         //         });
//     };

//     return (
//         <Box className="fixed-cart">
//             <Box className="box-block">
//                 <Typography variant="h6" className="box-block-title">
//                     Địa chỉ nhận hàng
//                 </Typography>
//                 <Box className="user-address">
//                     <Box className="show-phone-address">
//                         <Typography>Võ Minh Trí</Typography>
//                         <Typography>092843746</Typography>
//                     </Box>
//                     <Box className="show-address">
//                         <Typography>
//                             Tòa S1.02 Vinhomes Grand Park, Nguyễn Xiển, Long Bình, Thủ Đức,
//                             Thành phố Hồ Chí Minh, Việt Nam
//                         </Typography>
//                     </Box>
//                 </Box>
//             </Box>
//             <Box className="box-block">
//                 <Typography variant="h6" className="box-block-title">
//                     Ưu đãi và giảm giá
//                 </Typography>
//                 <Box className="user-address">
//                     <Box className="show-phone-address">
//                         <Button
//                             variant="contained"
//                             color="primary"
//                             onClick={() => setShow(true)}
//                         >
//                             {isUsedVoucher ? "Đã áp dụng 1 voucher" : "Sử dụng mã giảm giá"}
//                         </Button>

//                         {/* MODAL */}
//                         <Dialog open={show} onClose={() => setShow(false)}>
//                             <DialogTitle>Sử dụng mã giảm giá</DialogTitle>
//                             <DialogContent>
//                                 <ModalVoucher
//                                     listOfVoucher={listOfVoucherById}
//                                     isUsedVoucher={() => setIsUsedVoucher(true)}
//                                     closeModal={() => setShow(false)}
//                                     onSubmit={() => { }}
//                                     errors={[]}
//                                 />
//                             </DialogContent>
//                             <DialogActions>
//                                 <Button onClick={() => setShow(false)}>Đóng</Button>
//                             </DialogActions>
//                         </Dialog>
//                     </Box>
//                 </Box>
//             </Box>
//             <Box className="box-block">
//                 <Typography variant="h6" className="box-block-title">
//                     Tổng tiền
//                 </Typography>
//                 <Box className="summary-item">
//                     Tạm tính: <Typography>{formatVND(temporary)}</Typography>
//                 </Box>
//                 <Box className="summary-item">
//                     Giảm giá sản phẩm: <Typography>-{formatVND(discount)}</Typography>
//                 </Box>
//                 <Box className="summary-item">
//                     Phí vận chuyển: <Typography>+0 ₫</Typography>
//                 </Box>
//                 <Box className="summary-item">
//                     Tổng tiền: <Typography>{formatVND(total)} (Đã bao gồm VAT)</Typography>
//                 </Box>
//                 <Button
//                     variant="contained"
//                     onClick={handleClick}
//                     style={{ background: "#FF199B", margin: 0, color: "white" }}
//                 >
//                     Tiếp tục
//                 </Button>
//             </Box>
//         </Box>
//     );
// }


import React from 'react'

export default function CartUser() {
    return (
        <div>CartUser</div>
    )
}
