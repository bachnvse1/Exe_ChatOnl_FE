import React from "react";
import { useState, useEffect } from "react";
import "../css/style.css";
import config from "../config";
import "../css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import logo from "../images/LogoGomXinh.webp";
import userIcon from "../images/user.svg";
import cartIcon from "../images/cart.svg";
import envelopeIcon from "../images/envelope-outline.svg";
import couch from "../images/combogom2-removebg-preview.png";
const Shop = () => {
  // State để lưu danh sách sản phẩm
  const [products, setProducts] = useState([]);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Lấy sản phẩm hiển thị trên trang hiện tại
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const [categories, setCategories] = useState([]);

  // Tính số trang
  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredProducts.length / productsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    let filtered = products;

    // Xử lý search
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Xử lý filter theo danh mục
    if (selectedCategory) {
      filtered = filtered.filter(
        (product) =>
          product.categoryId.toString() === selectedCategory.toString()
      );
      console.log("Selected Category:", selectedCategory);
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory]);
  const token = sessionStorage.getItem("token");
  useEffect(() => {
    fetch(`${config.API_BASE_URL}/Products`, {
      headers: {
        "ngrok-skip-browser-warning": "true", // Bỏ qua cảnh báo ngrok
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Lỗi khi lấy sản phẩm:", error));

    // Gọi API để lấy danh sách danh mục
    fetch(`${config.API_BASE_URL}/Categories`, {
      headers: {
        "ngrok-skip-browser-warning": "true",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Lỗi khi lấy danh mục:", error));
  }, []);
  return (
    <>
      <nav
        class="custom-navbar navbar navbar navbar-expand-md navbar-dark"
        arial-label="Furni navigation bar"
      >
        <div class="container">
          <a class="navbar-brand d-flex align-items-center" href="/home">
            <img src={logo} alt="Logo" class="logo" />
            <span class="brand-text">
              Gom Xinh<span>.</span>
            </span>
          </a>

          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsFurni"
            aria-controls="navbarsFurni"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarsFurni">
            <ul class="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">
              <li class="nav-item ">
                <a class="nav-link" href="/home">
                  Trang chủ
                </a>
              </li>
              <li class="nav-item ">
                <a class="nav-link" href="/shop">
                  Cửa hàng
                </a>
              </li>
              <li class="nav-item ">
                <a class="nav-link" href="about.html">
                  Câu chuyện thương hiệu
                </a>
              </li>
              <li class="nav-item ">
                <a class="nav-link" href="services.html">
                  Dịch vụ
                </a>
              </li>
              <li>
                <a class="nav-link" href="blog.html">
                  Blog
                </a>
              </li>
              <li>
                <a class="nav-link" href="contact.html">
                  Liên hệ
                </a>
              </li>
            </ul>

            <ul class="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5">
              <li>
                {" "}
                <a className="nav-link" href="#">
                  {" "}
                  <img src={userIcon} alt="User" />{" "}
                </a>{" "}
              </li>{" "}
              <li>
                {" "}
                <a className="nav-link" href="#">
                  {" "}
                  <img src={cartIcon} alt="Cart" />{" "}
                </a>{" "}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-5">
              <h1 style={{ fontSize: "2rem" }}>
                Modern Interior Combined With Tradition{" "}
                <span className="d-block" style={{ fontSize: "1.8rem" }}>
                  Design Studio
                </span>
              </h1>

              <p>
                Mang nét đẹp văn hoá đồ gốm decor hiện đại tới với mọi người
              </p>
              <p>
                <a href="/shop" className="btn btn-secondary me-2">
                  Mua ngay
                </a>
                <a href="#" className="btn btn-outline-dark">
                  Explore
                </a>
              </p>
            </div>
            <div className="col-lg-7">
              <div className="hero-img-wrap">
                <img src={couch} className="img-fluid" alt="Hero Couch" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <div className="container product-section">
        {/* Search Bar */}
        <div className="row mb-4">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {/* Filter Dropdown (ví dụ: filter theo category) */}
          {/* Filter Dropdown (danh mục được gọi từ API) */}
          <div className="col-md-6">
            <select
              className="form-control"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Tất cả danh mục</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Product List */}
        <div className="row">
          {currentProducts.map((product) => (
            <div key={product.id} className="col-12 col-md-4 col-lg-3 mb-5">
              <a className="product-item" href="#">
                <img
                  src={product.imageUrl}
                  className="img-fluid product-thumbnail"
                  alt={product.name || "Sản phẩm"}
                  style={{
                    width: "100%",
                    height: "250px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
                <h3 className="product-title">{product.name}</h3>
                <strong className="product-price">
                  {product.price.toLocaleString("vi-VN")} VNĐ
                </strong>
                <span className="icon-cross">
                  <img
                    src="images/cross.svg"
                    className="img-fluid"
                    alt="Cross"
                  />
                </span>
              </a>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <nav>
          <ul className="pagination justify-content-center">
            {pageNumbers.map((number) => (
              <li
                key={number}
                className={`page-item ${
                  currentPage === number ? "active" : ""
                }`}
              >
                <a onClick={() => setCurrentPage(number)} className="page-link">
                  {number}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Footer */}
      <footer className="footer-section text-light text-center p-3 mt-5">
        <div className="container">
          <h3>Subscribe to Newsletter</h3>
          <form className="row g-3 justify-content-center">
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
              />
            </div>
            <div className="col-auto">
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
              />
            </div>
            <div className="col-auto">
              <button className="btn btn-primary">
                <img src={envelopeIcon} alt="Subscribe" />
              </button>
            </div>
          </form>
          <p>&copy; {new Date().getFullYear()} Gom Xinh Potter</p>
        </div>
      </footer>

      <div className="home-container">
        <nav className="custom-navbar navbar navbar-expand-md navbar-dark bg-dark">
          <div className="container">
            <a className="navbar-brand" href="#">
              Gom Xinh Potter<span className="text-primary">.</span>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Shop;
