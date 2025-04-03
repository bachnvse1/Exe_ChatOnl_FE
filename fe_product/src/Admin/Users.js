import React, { useEffect, useState, useCallback } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import axios from "axios";
import config from "../config";
import { Box, Button } from "@mui/material";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const handleRefresh = () => {
    setRefresh((prev) => !prev); // Cập nhật `refresh` để gọi lại API
  };
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const fetchUsers = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleDelete = async (username, isDeleted) => {
    const result = await Swal.fire({
      title: `Bạn có chắc chắn muốn ${
        isDeleted ? "kích hoạt" : "vô hiệu hóa"
      }?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: isDeleted ? "Kích hoạt" : "Vô hiệu hóa",
      cancelButtonText: "Hủy",
    });

    if (result.isConfirmed) {
      try {
        const token = sessionStorage.getItem("token");
        await axios.delete(`${config.API_BASE_URL}/Users/${username}`, {
          headers: {
            "ngrok-skip-browser-warning": "true",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success(`${isDeleted ? "Kích hoạt" : "Vô hiệu hóa"} thành công!`);
        setUsers(
          users.map((users) =>
            users.username === username
              ? { ...users, isDeleted: !isDeleted }
              : users
          )
        );
      } catch (error) {
        toast.error(`${isDeleted ? "Kích hoạt" : "Vô hiệu hóa"} thất bại!`);
      }
    }
  };

  const handleEdit = async (row) => {
    const { value: formValues } = await Swal.fire({
      title: `Cập nhật`,
      html: `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
          <div style="width: 100%; display: flex; justify-content: space-between; align-items: center;">
            <label for="role" style="flex: 1; text-align: left; font-size: 16px;">Vai trò:</label>
            <select id="role" class="swal2-input" style="flex: 2; padding: 8px; font-size: 16px;">
              <option value="employee" ${
                row.roleName === "employee" ? "selected" : ""
              }>Employee</option>
              <option value="admin" ${
                row.roleName === "admin" ? "selected" : ""
              }>Admin</option>
              <option value="customer" ${
                row.roleName === "customer" ? "selected" : ""
              }>Customer</option>
            </select>
          </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Cập nhật",
      cancelButtonText: "Hủy",
      preConfirm: () => {
        return {
          role: document.getElementById("role").value,
        };
      },
    });

    if (!formValues) return;

    try {
      const token = sessionStorage.getItem("token");

      await axios.put(
        `${config.API_BASE_URL}/Users/updateStatus/${row.username}`,
        { role: formValues.role },
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Cập nhật thành công!", { position: "top-right" });
      fetchUsers();
    } catch (error) {
      toast.error("Cập nhật thất bại!", { position: "top-right" });
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
            color={params.row.isDeleted ? "success" : "error"}
            size="small"
            onClick={() =>
              handleDelete(params.row.username, params.row.isDeleted)
            }
          >
            {params.row.isDeleted ? "Kích hoạt" : "Vô hiệu hóa"}
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
        onPaginationModelChange={setPaginationModel}
        checkboxSelection
        disableRowSelectionOnClick
        getRowId={(row) => row.username}
        slots={{ toolbar: GridToolbar }}
      />
    </Box>
  );
};

export default Users;
