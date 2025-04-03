import React, { useEffect, useState, useCallback } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Dialog,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import config from "../config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const [categories, setCategories] = useState([]);
  const fetchProducts = useCallback(async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get(`${config.API_BASE_URL}/Products`, {
        headers: {
          "ngrok-skip-browser-warning": "true",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setProducts(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCategories = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const apiUrl = `${config.API_BASE_URL}/Categories`;
      const response = await fetch(apiUrl, {
        headers: {
          "ngrok-skip-browser-warning": "true",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Lỗi khi lấy danh mục:", error);
      setCategories([]);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [fetchProducts]);

  const handleAddProduct = async () => {
    try {
      const token = sessionStorage.getItem("token");

      const response = await axios.post(
        `${config.API_BASE_URL}/Products`,
        newProduct,
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success(response.data.message);
        fetchProducts();
        handleCloseAdd();
      } else {
        toast.error(response.data.message || "Lỗi khi thêm sản phẩm");
        handleCloseAdd();
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Lỗi không xác định!");
      } else {
        toast.error("Có lỗi xảy ra khi thêm sản phẩm.");
      }
      handleCloseAdd();
    }
  };
  const handleEdit = (product) => {
    setEditProduct({ ...product });
    setOpenEditDialog(true);
  };

  const handleCloseEdit = () => {
    setOpenEditDialog(false);
    setEditProduct(null);
  };

  const handleSaveEdit = async () => {
    try {
      const token = sessionStorage.getItem("token");
      await axios.put(
        `${config.API_BASE_URL}/Products/${editProduct.id}`,
        editProduct,
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Cập nhật sản phẩm thành công!");
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === editProduct.id ? { ...editProduct } : p
        )
      );
      handleCloseEdit();
    } catch (error) {
      toast.error("Cập nhật thất bại!");
    }
  };

  const handleDelete = async (id, isDeleted) => {
    const result = await Swal.fire({
      title: `Bạn có chắc chắn muốn ${
        isDeleted ? "kích hoạt" : "vô hiệu hóa"
      } sản phẩm này?`,
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
        await axios.delete(`${config.API_BASE_URL}/Products/${id}`, {
          headers: {
            "ngrok-skip-browser-warning": "true",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success(
          `${isDeleted ? "Kích hoạt" : "Vô hiệu hóa"} sản phẩm thành công!`
        );
        setProducts(
          products.map((product) =>
            product.id === id ? { ...product, isDeleted: !isDeleted } : product
          )
        );
      } catch (error) {
        toast.error(
          `${isDeleted ? "Kích hoạt" : "Vô hiệu hóa"} sản phẩm thất bại!`
        );
      }
    }
  };

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  const handleCloseAdd = () => {
    setOpenAddDialog(false);
    setNewProduct({
      name: "",
      price: "",
      description: "",
      category: "",
      image: "",
    });
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
      renderCell: (params) =>
        params.row.price?.toLocaleString("vi-VN") || "N/A",
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
            color={params.row.isDeleted ? "success" : "error"}
            size="small"
            onClick={() => handleDelete(params.row.id, params.row.isDeleted)}
          >
            {params.row.isDeleted ? "Kích hoạt" : "Vô hiệu hóa"}
          </Button>
        </div>
      ),
    },
  ];

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <Box sx={{ height: 600, width: "100%" }}>
      {/* Dialog thêm sản phẩm */}
      <Dialog open={openAddDialog} onClose={handleCloseAdd}>
        <Box sx={{ padding: 3, minWidth: 400 }}>
          <Typography variant="h6">Thêm sản phẩm mới</Typography>

          {/* Tên sản phẩm */}
          <TextField
            fullWidth
            label="Tên sản phẩm"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            sx={{ marginTop: 2 }}
          />

          {/* Giá sản phẩm */}
          <TextField
            fullWidth
            label="Giá"
            type="number"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            sx={{ marginTop: 2 }}
          />

          {/* Mô tả sản phẩm */}
          <TextField
            fullWidth
            label="Mô tả"
            multiline
            rows={3}
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            sx={{ marginTop: 2 }}
          />

          {/* Danh mục sản phẩm */}
          <TextField
            select
            fullWidth
            label="Danh mục"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
            sx={{ marginTop: 2 }}
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.name}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>

          {/* Ảnh sản phẩm */}
          <TextField
            fullWidth
            label="URL Ảnh"
            value={newProduct.image}
            onChange={(e) =>
              setNewProduct({ ...newProduct, image: e.target.value })
            }
            sx={{ marginTop: 2 }}
          />

          {/* Hiển thị ảnh xem trước nếu có */}
          {newProduct.image && (
            <Box
              sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
            >
              <img
                src={newProduct.image}
                alt="Preview"
                style={{ maxWidth: "100%", height: 150, objectFit: "cover" }}
              />
            </Box>
          )}

          {/* Nút hành động */}
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", marginTop: 3 }}
          >
            <Button onClick={handleCloseAdd} sx={{ marginRight: 1 }}>
              Hủy
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddProduct}
            >
              Thêm
            </Button>
          </Box>
        </Box>
      </Dialog>

      <Button
        variant="contained"
        color="primary"
        sx={{ marginBottom: 2 }}
        onClick={() => setOpenAddDialog(true)}
      >
        Thêm sản phẩm
      </Button>
      <DataGrid
        rows={products}
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
      <Dialog open={open} onClose={handleClose}>
        <img
          src={selectedImage}
          alt="Phóng to"
          style={{ maxWidth: "90vw", maxHeight: "90vh", margin: "auto" }}
        />
      </Dialog>
      <Dialog open={openEditDialog} onClose={handleCloseEdit}>
        <Box sx={{ padding: 3, minWidth: 400 }}>
          <Typography variant="h6">Chỉnh sửa sản phẩm</Typography>
          <TextField
            fullWidth
            label="Tên sản phẩm"
            value={editProduct?.name || ""}
            onChange={(e) =>
              setEditProduct({ ...editProduct, name: e.target.value })
            }
            sx={{ marginTop: 2 }}
          />
          <TextField
            fullWidth
            label="Giá"
            type="number"
            value={editProduct?.price || ""}
            onChange={(e) =>
              setEditProduct({ ...editProduct, price: e.target.value })
            }
            sx={{ marginTop: 2 }}
          />
          <TextField
            fullWidth
            label="Mô tả"
            multiline
            rows={3}
            value={editProduct?.description || ""}
            onChange={(e) =>
              setEditProduct({ ...editProduct, description: e.target.value })
            }
            sx={{ marginTop: 2 }}
          />
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", marginTop: 3 }}
          >
            <Button onClick={handleCloseEdit} sx={{ marginRight: 1 }}>
              Hủy
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveEdit}
            >
              Lưu
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default Products;
