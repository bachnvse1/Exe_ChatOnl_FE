import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Alert } from "@mui/material";
import axios from "axios";
import config from "../config";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await axios.get(`${config.API_BASE_URL}/Orders`, {
          headers: {
            "ngrok-skip-browser-warning": "true",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          setOrders(response.data);
        } else {
          throw new Error("Lỗi khi tải đơn hàng");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const columns = [
    { field: "id", headerName: "Mã đơn", flex: 1 },
    { field: "customerName", headerName: "Khách hàng", flex: 1 },
    {
      field: "totalPrice",
      headerName: "Tổng tiền (VND)",
      flex: 1,
      renderCell: (params) => params.value.toLocaleString("vi-VN"),
    },
    { field: "status", headerName: "Trạng thái", flex: 1 },
    {
      field: "createdAt",
      headerName: "Ngày tạo",
      flex: 1,
      renderCell: (params) => new Date(params.value).toLocaleString(),
    },
    {
      field: "updatedAt",
      headerName: "Cập nhật",
      flex: 1,
      renderCell: (params) =>
        params.value ? new Date(params.value).toLocaleString() : "N/A",
    },
  ];

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={orders}
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

export default Orders;
