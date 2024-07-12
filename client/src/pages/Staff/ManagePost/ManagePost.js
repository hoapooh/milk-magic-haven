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
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MainAPI } from "../../../API";
import axios from "axios";

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

function convertSQLDate(sqlDate) {
  const date = new Date(sqlDate);
  const options = { year: "numeric", month: "short", day: "2-digit" };
  return date.toLocaleDateString("en-US", options);
}

export default function ManageProduct() {
  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const nav = useNavigate();

  const fetchData = () => {
    fetch(`http://localhost:8000/user/get-all-post`, {
      method: "GET",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data get product");
        return res.json();
      })
      .then((data) => setProductList(data.data))
      .catch((error) => console.error("Error fetching data product:", error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`${MainAPI}/staff/delete-post/${id}`, {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        console.log(res);
        toast.success("Delete post successfully");
        fetchData();
      })
      .catch((error) => {
        console.log("Error fetching data product:", error);
        toast.error(error.response.data.message);
      });
  };

  // console.log(productList);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - productList.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
      <ToastContainer />
      <Box textAlign={"center"}>
        <Button
          sx={{
            border: "1px solid #49A1D7",
            fontSize: "13px",
          }}
          onClick={() => nav("/staff/managepost/create-post")}
        >
          Add new post
        </Button>
      </Box>
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
                Post ID
              </TableCell>
              <TableCell align="center" sx={{ fontSize: "1.2rem" }}>
                Image Thumbnail
              </TableCell>
              <TableCell align="center" sx={{ fontSize: "1.2rem" }}>
                UserId
              </TableCell>
              <TableCell align="center" sx={{ fontSize: "1.2rem" }}>
                Post Date
              </TableCell>
              <TableCell align="center" sx={{ fontSize: "1.2rem" }}></TableCell>
              <TableCell align="center" sx={{ fontSize: "1.2rem" }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? productList.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
              : productList
            ).map((product, index) => (
              <TableRow key={product.post_id}>
                <TableCell
                  style={{ width: 100 }}
                  align="center"
                  sx={{ fontSize: "1.2rem" }}
                >
                  {product.post_id}
                </TableCell>
                <TableCell
                  style={{ width: 150 }}
                  align="center"
                  sx={{ fontSize: "1.2rem" }}
                >
                  <img
                    src={product.img_thumbnail}
                    style={{ width: "100%", height: "100%" }}
                  />
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
                  {convertSQLDate(product.post_date)}
                </TableCell>
                <TableCell
                  style={{ width: 40 }}
                  align="center"
                  sx={{ fontSize: "1.2rem" }}
                >
                  <Button
                    onClick={() => {
                      handleDelete(product.post_id);
                    }}
                  >
                    <DeleteIcon color="error" />
                  </Button>
                </TableCell>
                <TableCell
                  style={{ width: 40 }}
                  align="center"
                  sx={{ fontSize: "1.2rem" }}
                >
                  <Button
                    onClick={() =>
                      nav(`/staff/managepost/edit-post/${product.post_id}`)
                    }
                  >
                    <EditIcon color="success" />
                  </Button>
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
                rowsPerPageOptions={[5]}
                colSpan={9}
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
  );
}
