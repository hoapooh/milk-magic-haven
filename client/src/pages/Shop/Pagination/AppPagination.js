import { Box, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import listOfProducts from "../ProductList/ListOfProduct";

const pageSize = 6;

export default function AppPagination({ setProducts }) {
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });
  useEffect(() => {
    setPagination({ ...pagination, count: listOfProducts.length });
    setProducts(listOfProducts.slice(pagination.from, pagination.to));
  }, [pagination.from, pagination.to]);

  const handleChange = (event, page) => {
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;
    setPagination({
      ...pagination,
      from: from,
      to: to,
    });
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignContent={"center"}
      sx={{ margin: "20px 0px" }}
    >
      <Pagination
        count={Math.ceil(pagination.count / pageSize)}
        color="primary"
        onChange={handleChange}
      />
    </Box>
  );
}
