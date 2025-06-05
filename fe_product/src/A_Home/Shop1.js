import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Pagination,
  Select,
  MenuItem,
  Modal,
  Box,
  IconButton,
  Container,
  Grid,
  Menu,
  useMediaQuery,
  useTheme,
  Dialog,
} from "@mui/material";
import {
  ShoppingCart,
  Person,
  Search,
  Close,
  Favorite,
  MoreVert,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Navigation,
  Pagination as SwiperPagination,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import config from "../config";
import Footer from "./footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../images/LogoGPT.webp";

const Shop1 = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [productDetail, setProductDetail] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const token = sessionStorage.getItem("token");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setOpen(true);
    console.log("Mỏ ảnh");
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      if (!token) {
        console.error("Token không hợp lệ hoặc chưa có.");
        return;
      }
      try {
        const apiUrl = `${config.API_BASE_URL}/Products`;
        const response = await fetch(apiUrl, {
          headers: {
            "ngrok-skip-browser-warning": "true",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setProducts(data || []);
        setFilteredProducts(data || []);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
        setProducts([]);
        setFilteredProducts([]);
      }
    };

    fetchProducts();
  }, [token]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
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

    fetchCategories();
  }, [token]);

  useEffect(() => {
    let filtered = products;
    if (selectedCategory) {
      filtered = filtered.filter(
        (product) =>
          product.categoryId.toString() === selectedCategory.toString()
      );
    }
    setFilteredProducts(filtered);
  }, [products, selectedCategory]);

  const handleSearch = async () => {
    try {
      const normalizedSearch = searchInput
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
      const apiUrl = `${
        config.API_BASE_URL
      }/Products?$filter=contains(tolower(NormalizedName), '${encodeURIComponent(
        normalizedSearch
      )}')`;
      const response = await fetch(apiUrl, {
        headers: {
          "ngrok-skip-browser-warning": "true",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setFilteredProducts(data || []);
    } catch (error) {
      console.error("Lỗi khi tìm kiếm sản phẩm:", error);
      setFilteredProducts([]);
    }
  };

  const handleProductClick = async (productId) => {
    try {
      const apiUrl = `${config.API_BASE_URL}/Products/${productId}`;
      const response = await fetch(apiUrl, {
        headers: {
          "ngrok-skip-browser-warning": "true",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setProductDetail(data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setProductDetail(null);
  };

  const handlerCartClick = async (productId) => {
    try {
      const apiUrl = `${config.API_BASE_URL}/Carts/addToCart/${productId}`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "ngrok-skip-browser-warning": "true",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(1),
      });
      if (!response.ok) throw new Error("Thêm vào giỏ hàng thất bại");
      toast.success(`Thêm vào giỏ hàng thành công`, {
        position: "top-left",
      });
      closeModal();
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Thêm vào giỏ hàng thất bại!");
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    handleMenuClose();
  };

  const ProductModal = ({ product, onClose }) => {
    if (!product) return null;

    return (
      <Modal open={isModalOpen} onClose={onClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <IconButton
            onClick={onClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <Close />
          </IconButton>
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>
          <CardMedia
            component="img"
            image={product.imageUrl}
            alt={product.name}
            sx={{ height: 250, borderRadius: 2, mb: 2 }}
          />
          <Typography variant="body1" gutterBottom>
            {product.description || "Không có mô tả"}
          </Typography>
          <Typography variant="h6" sx={{ color: "orange", fontWeight: "bold" }}>
            {product.price.toLocaleString("vi-VN")} VNĐ
          </Typography>
          <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              sx={{ bgcolor: "orange", "&:hover": { bgcolor: "darkorange" } }}
            >
              Mua Ngay
            </Button>
            <Button
              variant="contained"
              onClick={() => handlerCartClick(product.id)}
              sx={{ bgcolor: "green", "&:hover": { bgcolor: "darkgreen" } }}
            >
              Thêm Vào Giỏ Hàng
            </Button>
          </Box>
        </Box>
      </Modal>
    );
  };

  return (
    <div>
      <AppBar position="static" sx={{ bgcolor: "#8B5A2B" }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <img
              src={logo}
              alt="Gom Xinh Potter"
              style={{
                height: "50px", // Điều chỉnh kích thước
                borderRadius: "10px", // Bo góc 10px (có thể tăng hoặc giảm)
                objectFit: "cover", // Đảm bảo ảnh không bị méo
              }}
            />
          </Box>
          <TextField
            variant="outlined"
            placeholder="Tìm kiếm sản phẩm..."
            size="small"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            sx={{ mr: 2, bgcolor: "white", borderRadius: 1 }}
          />
          <Button
            variant="contained"
            onClick={handleSearch}
            startIcon={<Search />}
            sx={{ bgcolor: "white", color: "orange" }}
          ></Button>

          <IconButton color="inherit" href="/cart">
            <ShoppingCart />
          </IconButton>
          {token ? (
            <IconButton color="inherit" href="/profile">
              <Person />
            </IconButton>
          ) : null}
          {token ? (
            <Button
              color="inherit"
              onClick={() => {
                sessionStorage.removeItem("token");
                window.location.reload();
              }}
            >
              Đăng xuất
            </Button>
          ) : (
            <Button color="inherit" href="/">
              Đăng nhập
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Tất cả danh mục</MenuItem>
        {categories.map((category) => (
          <MenuItem
            key={category.id}
            value={category.id}
            onClick={handleCategoryChange}
          >
            {category.name}
          </MenuItem>
        ))}
      </Menu>

      <Container sx={{ mt: 4 }}>
        <Swiper
          modules={[Autoplay, Navigation, SwiperPagination]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 3000 }}
          navigation
          pagination={{ clickable: true }}
        >
          <SwiperSlide>
            <img
              src="https://bizweb.dktcdn.net/100/086/616/files/battrangmynghe-vn-4d2c7726-2ea8-4f54-8ba4-fbfc7df826b9.jpg?v=1487906066372"
              alt="Slide 1"
              style={{ width: "100%", borderRadius: "10px" }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://consosukien.vn/pic/News/Nam_2021/tinh-hoa-nghe-gom-xua-va-nay.jpg"
              alt="Slide 2"
              style={{ width: "100%", borderRadius: "10px" }}
            />
          </SwiperSlide>
        </Swiper>

        <Box sx={{ mt: 4 }}>
          <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
            <Typography variant="h4" gutterBottom>
              Sản Phẩm Nổi Bật
            </Typography>
          </Box>
          {isMobile ? (
            <IconButton
              color="inherit"
              onClick={handleMenuOpen}
              sx={{
                bgcolor: "#E4C9A0",
                color: "#6D4C41",
                p: 0.5,
                borderRadius: "4px", // Giảm bo góc để gần với hình chữ nhật hơn
                "&:hover": { bgcolor: "#D1B295" },
                marginBottom: "5px",
              }}
            >
              <MoreVert fontSize="small" />
            </IconButton>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                width: "100%",
                height: "40px",
                marginBottom: "5px",
              }}
            >
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                displayEmpty
                sx={{
                  minWidth: 120,
                  maxWidth: 160,
                  fontSize: "14px",
                  bgcolor: "#F5E1C0",
                  color: "#5D4037",
                  fontWeight: "bold",
                  borderRadius: "4px",
                  p: "6px 10px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  "&:hover": { bgcolor: "#E4C9A0" },
                }}
              >
                <MenuItem value="">Danh mục</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          )}

          <Grid container spacing={3}>
            {currentProducts.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Card>
                    <CardMedia
                      component="img"
                      image={product.imageUrl}
                      alt={product.name}
                      sx={{ height: 200 }}
                      onClick={() => handleImageClick(product.imageUrl)}
                    />
                    <CardContent>
                      <Typography variant="h6">{product.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {product.price.toLocaleString("vi-VN")} VNĐ
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        onClick={() => handleProductClick(product.id)}
                      >
                        Xem chi tiết
                      </Button>
                    </CardActions>
                  </Card>
                </motion.div>
              </Grid>
            ))}
            <Dialog open={open} onClose={handleClose}>
              <img
                src={selectedImage}
                alt="Phóng to"
                style={{ maxWidth: "90vw", maxHeight: "90vh", margin: "auto" }}
              />
            </Dialog>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={Math.ceil(filteredProducts.length / productsPerPage)}
              page={currentPage}
              onChange={(e, page) => setCurrentPage(page)}
              color="primary"
            />
          </Box>
        </Box>
      </Container>
      <Footer />
      {isModalOpen && (
        <ProductModal product={productDetail} onClose={closeModal} />
      )}
    </div>
  );
};

export default Shop1;
