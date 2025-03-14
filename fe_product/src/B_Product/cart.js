import React, { useEffect, useState } from "react";
import config from "../config";
import "../css1/cart.css";

const Cart = () => {
  const token = sessionStorage.getItem("token");
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    fetchCartItems();
  }, [token]);

  const fetchCartItems = async () => {
    try {
      const response = await fetch(`${config.API_BASE_URL}/Carts`, {
        headers: {
          "ngrok-skip-browser-warning": "true",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch cart data");

      const data = await response.json();
      setCartItems(data);
      calculateSubtotal(data);
    } catch (error) {
      console.error("Error loading cart data:", error);
    }
  };

  const updateQuantity = async (id, delta) => {
    try {
      const response = await fetch(`${config.API_BASE_URL}/Carts/updateCart`, {
        method: "PUT",
        headers: {
          "ngrok-skip-browser-warning": "true",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: id, quantity: delta }),
      });

      if (!response.ok) throw new Error("Cập nhật số lượng thất bại");
      fetchCartItems();
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Cập nhật số lượng thất bại!");
    }
  };

  const calculateSubtotal = (items) => {
    const total = items.reduce((acc, item) => acc + item.totalPrice, 0);
    setSubtotal(total);
  };

  return (
    <div
      className="cart-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        marginTop: "10vh",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <div
        className="cart-content-wrapper"
        style={{ maxWidth: "1200px", width: "100%" }}
      >
        <h2 className="cart-title">Giỏ hàng</h2>
        <p className="cart-subtitle">Thoải mái mua sắm bạn nhé !</p>
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img
                  src={item.imageProduct}
                  alt={item.productName}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.productName}</h3>
                  <p className="cart-item-stock">
                    {item.inStock ? "In Stock" : "Out of Stock"}
                  </p>
                  <div className="cart-item-quantity">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      -
                    </button>
                    <input type="text" value={item.quantity} readOnly />
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="cart-item-price">
                  {item.totalPrice.toLocaleString()} VNĐ
                </div>
              </div>
            ))}
          </div>
          <div
            className="cart-summary"
            style={{
              width: "100%",
              maxWidth: "500px",
              margin: "20px auto",
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "10px",
            }}
          >
            <h3>Tóm tắt đơn hàng:</h3>
            <p>Tổng tiền:: {subtotal.toLocaleString()} VNĐ</p>
            <p>Phí Ship: 0</p>
            <p>Thuế VAT : 0</p>
            <h4>Tổng tiền: {subtotal.toLocaleString()} VNĐ</h4>
            <button className="checkout-button">Thanh toán</button>
            <button className="continue-shopping">Tiếp tục mua sắm</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
