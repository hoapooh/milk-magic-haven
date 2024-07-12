import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { Button } from "@mui/material";
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import CloseIcon from '@mui/icons-material/Close';
import { convertSQLDate } from "../../../utils/Format";

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
    <Box sx={{ flexShrink: 0, ml: 2.5, display: "flex" }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
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

export default function ManageOrder() {
  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [dataConfirm, setDataConfirm] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/staff/get-all-order"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setProductList(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  console.log(productList);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - productList.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const checkStatusIsPending = (status) => {
    if (!status) return false;
    return status.toLowerCase() === "pending";
  };

  const handleConfirm = (product) => {
    fetch("http://localhost:8000/staff/confirm-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({ order_id: product.order_id }),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to confirm order");
        return response.json();
      })
      .then((data) => {
        setDataConfirm((prevData) =>
          prevData.map((item) =>
            item.order_id === product.order_id
              ? { ...item, status: data.status }
              : item
          )
        );
        // toast.success("Order confirmed successfully");
        fetchData();
      })
      .catch((error) => console.error("Error confirming order:", error));
  }

  const handleCancel = (product) => {
    console.log(product.order_id);
    fetch("http://localhost:8000/staff/cancel-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({ order_id: product.order_id }),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to cancel order");
        return response.json();
      })
      .then((data) => {
        setDataConfirm((prevData) =>
          prevData.map((item) =>
            item.order_id === product.order_id
              ? { ...item, status: data.data.status }
              : item
          )
        );
        // toast.success("Order canceled successfully");
        fetchData();
      })
      .catch((error) => console.error("Error canceling order:", error));
  }

  return (
    <Box display="flex" justifyContent="center">
      <TableContainer
        component={Paper}
        sx={{ width: "90%", mx: "auto", mt: 0.5 }}
      >
        <Table
          sx={{ minWidth: 1000, fontSize: "1.2rem" }}
          aria-label="custom pagination table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontSize: "1.2rem" }}>
                Order ID
              </TableCell>
              <TableCell align="center" sx={{ fontSize: "1.2rem" }}>
                User ID
              </TableCell>
              <TableCell align="center" sx={{ fontSize: "1.2rem" }}>
                Order Date
              </TableCell>
              <TableCell align="center" sx={{ fontSize: "1.2rem" }}>
                Status
              </TableCell>
              <TableCell align="center" sx={{ fontSize: "1.2rem" }}>
                Total
              </TableCell>
              <TableCell align="center" sx={{ fontSize: "1.2rem" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? productList.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
              : productList
            ).map((product) => (
              <TableRow key={product.order_id}>
                <TableCell
                  style={{ width: 260 }}
                  align="center"
                  sx={{ fontSize: "1.2rem" }}
                >
                  {product.order_id}
                </TableCell>
                <TableCell
                  style={{ width: 260 }}
                  align="center"
                  sx={{ fontSize: "1.2rem" }}
                >
                  {product.user_id}
                </TableCell>
                <TableCell
                  style={{ width: 260 }}
                  align="center"
                  sx={{ fontSize: "1.2rem" }}
                >
                  {convertSQLDate(product.order_date)}
                </TableCell>
                <TableCell
                  style={{ width: 260 }}
                  align="center"
                  sx={{ fontSize: "1.2rem" }}
                >
                  {product.status}
                </TableCell>
                <TableCell
                  style={{ width: 260 }}
                  align="center"
                  sx={{ fontSize: "1.2rem" }}
                >
                  {product.total_amount}
                </TableCell>
                <TableCell
                  style={{ width: 260 }}
                  align="center"
                  sx={{ fontSize: "1.2rem" }}
                >
                  {checkStatusIsPending(product.status) ?
                    <>
                      <Button onClick={() => handleConfirm(product)}><DoneOutlineIcon style={{ color: 'green' }} /></Button>
                      <Button onClick={() => handleCancel(product)}><CloseIcon style={{ color: 'red' }} /></Button>
                    </>
                    :
                    <></>
                  }
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={7} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[4, 7]}
                colSpan={7}
                count={productList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    inputProps: {
                      "aria-label": "rows per page",
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
    </Box >
  );
}
