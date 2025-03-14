import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Dialog } from "@mui/material";
import axios from "axios";
import config from "../config";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await axios.get(`${config.API_BASE_URL}/Products`, {
          headers: {
            "ngrok-skip-browser-warning": "true",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          setProducts(response.data);
        } else {
          throw new Error("Lỗi khi tải sản phẩm");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    alert(`Chỉnh sửa: ${product.name}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      console.log("Xóa sản phẩm có ID:", id);
      // Thêm logic gọi API xóa sản phẩm tại đây
    }
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const columns = [
    { field: "name", headerName: "Tên sản phẩm", flex: 1 },
    {
      field: "price",
      headerName: "Giá (VNĐ)",
      flex: 1,
      renderCell: (params) => {
        return params.row.price
          ? params.row.price.toLocaleString("vi-VN")
          : "N/A";
      },
    },
    { field: "description", headerName: "Mô tả", flex: 2 },
    {
      field: "imageUrl",
      headerName: "Ảnh",
      flex: 1,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Sản phẩm"
          style={{
            width: 50,
            height: 50,
            cursor: "pointer",
            borderRadius: "5px",
          }}
          onClick={() => handleImageClick(params.value)}
        />
      ),
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

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <Box sx={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={products}
        columns={columns}
        pagination
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel} // Cập nhật page & pageSize khi chuyển trang
        pageSizeOptions={[5, 10, 20]}
        checkboxSelection
        disableRowSelectionOnClick
        getRowId={(row) => row.id}
        slots={{ toolbar: GridToolbar }}
      />

      {/* Dialog hiển thị ảnh lớn */}
      <Dialog open={open} onClose={handleClose}>
        <img
          src={selectedImage}
          alt="Phóng to"
          style={{ maxWidth: "90vw", maxHeight: "90vh", margin: "auto" }}
        />
      </Dialog>
    </Box>
  );
};

export default Products;
