import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import config from "../config";
import { Box, Button } from "@mui/material";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await axios.get(
          `${config.API_BASE_URL}/Users/AllUsers`,
          {
            headers: {
              "ngrok-skip-browser-warning": "true",
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          setUsers(response.data);
        } else {
          throw new Error("Failed to fetch users");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const handleEdit = (row) => {
    alert(`Chỉnh sửa: ${row.fullName}`);
  };

  // Hàm xử lý khi bấm vào nút Xóa
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa?")) {
      console.log("Xóa user có ID:", id);
      // Thêm logic xóa user từ API tại đây
    }
  };
  const columns = [
    { field: "fullName", headerName: "Tên", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "SĐT", flex: 1 },
    { field: "address", headerName: "Địa chỉ", flex: 1 },
    { field: "roleName", headerName: "Vai Trò", flex: 1 },
    {
      field: "createdAt",
      headerName: "Ngày tạo",
      flex: 1,
      renderCell: (params) => new Date(params.value).toLocaleString(),
    },
    {
      field: "updatedAt",
      headerName: "Chỉnh sửa lần cuối",
      flex: 1,
      renderCell: (params) => new Date(params.value).toLocaleString(),
    },
    {
      field: "actions",
      headerName: "Hành động",
      flex: 1,
      renderCell: (params) => (
        <div>
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<EditIcon />}
            onClick={() => handleEdit(params.row)}
            sx={{ marginRight: 1 }}
          >
            Sửa
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={() => handleDelete(params.row.id)}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Box sx={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={users}
        columns={columns}
        pageSizeOptions={[5, 10, 20]}
        pagination
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel} // Cập nhật page & pageSize khi chuyển trang
        checkboxSelection
        disableRowSelectionOnClick
        getRowId={(row) => row.username}
        slots={{ toolbar: GridToolbar }}
      />
    </Box>
  );
};

export default Users;
