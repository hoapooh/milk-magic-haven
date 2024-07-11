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
import { Button, TextField } from "@mui/material";

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

export default function ManageVoucher() {
  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [show, setShow] = useState(false);
  const [exDate, setExDate] = useState("");
  const [discount, setDiscount] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/user/get-all-voucher"
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

  const handleCreateVoucher = () => {
    fetch(`http://localhost:8000/staff/create-voucher`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        discount: discount,
        expiration_date: exDate,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add voucher");
        return res.json();
      })
      .then((data) => {
        console.log(data);
        fetchData();
        setShow(false);
        setExDate("");
        setDiscount("");
        console.log("Voucher added successfully");
      })
      .catch((error) => {
        console.error("Error adding voucher:", error);
      });
  };

  console.log(show);

  return (
    <>
      <Box>
        <Button
          onClick={() => setShow(!show)}
          sx={{ border: "1px solid #49A1D7" }}
        >
          Create New Voucher
        </Button>
      </Box>
      <Box>
        {show && (
          <Box mt={2} display="flex" alignItems="ceter">
            <TextField
              label="Expiration Date"
              type="date"
              name="expiration_date"
              onChange={(e) => setExDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ mb: 2, width: "300px", mr: 5 }}
            />
            <TextField
              label="Discount"
              type="number"
              name="discount"
              onChange={(e) => setDiscount(e.target.value)}
              sx={{ mb: 2, width: "300px", mr: 5 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateVoucher}
              sx={{ height: "45px", minWidth: "100px", marginTop: "2px" }}
            >
              Create Voucher
            </Button>
          </Box>
        )}
      </Box>
      <Box display="flex" justifyContent="center">
        <TableContainer
          component={Paper}
          sx={{ width: "100%", mx: "auto", mt: 0.5 }}
        >
          <Table
            sx={{ minWidth: 1000, fontSize: "1.2rem" }}
            aria-label="custom pagination table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ fontSize: "1.2rem" }}>
                  Voucher ID
                </TableCell>
                <TableCell align="center" sx={{ fontSize: "1.2rem" }}>
                  Code
                </TableCell>
                <TableCell align="center" sx={{ fontSize: "1.2rem" }}>
                  Discount
                </TableCell>
                <TableCell align="center" sx={{ fontSize: "1.2rem" }}>
                  Expiration Date
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
                <TableRow key={product.voucher_id}>
                  <TableCell
                    style={{ width: 260 }}
                    align="center"
                    sx={{ fontSize: "1.2rem" }}
                  >
                    {product.voucher_id}
                  </TableCell>
                  <TableCell
                    style={{ width: 260 }}
                    align="center"
                    sx={{ fontSize: "1.2rem" }}
                  >
                    {product.code}
                  </TableCell>
                  <TableCell
                    style={{ width: 260 }}
                    align="center"
                    sx={{ fontSize: "1.2rem" }}
                  >
                    {product.discount}
                  </TableCell>
                  <TableCell
                    style={{ width: 260 }}
                    align="center"
                    sx={{ fontSize: "1.2rem" }}
                  >
                    {product.expiration_date}
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
      </Box>
    </>
  );
}
