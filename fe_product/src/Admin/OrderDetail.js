import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Alert } from "@mui/material";
import axios from "axios";
import config from "../config";

const OrderDetails = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await axios.get(
          `${config.API_BASE_URL}/OrderDetails`,
          {
            headers: {
              "ngrok-skip-browser-warning": "true",
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          // Lọc bỏ OrderDetail bị xóa mềm (IsDeleted = true)
          const filteredData = response.data.filter((item) => !item.isDeleted);
          setOrderDetails(filteredData);
        } else {
          throw new Error("Lỗi khi tải chi tiết đơn hàng");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, []);

  const columns = [
    { field: "id", headerName: "Mã chi tiết", flex: 1 },
    { field: "orderId", headerName: "Mã đơn hàng", flex: 1 },
    { field: "productName", headerName: "tên sản phẩm", flex: 1 },
    { field: "quantity", headerName: "Số lượng", flex: 1 },
    {
      field: "price",
      headerName: "Giá (VND)",
      flex: 1,
      renderCell: (params) => params.value.toLocaleString("vi-VN"),
    },
  ];

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={orderDetails}
        columns={columns}
        pagination
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 20]}
        checkboxSelection
        disableRowSelectionOnClick
        getRowId={(row) => row.id}
        slots={{ toolbar: GridToolbar }}
      />
    </Box>
  );
};

export default OrderDetails;
