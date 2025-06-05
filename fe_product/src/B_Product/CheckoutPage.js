import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  Paper,
  Divider,
  Box,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import NotesIcon from "@mui/icons-material/Notes";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import config from "../config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const CheckoutPage = () => {
  const token = sessionStorage.getItem("token");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [cartUpdated, setCartUpdated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, [cartUpdated]);

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

  const calculateSubtotal = (items) => {
    const total = items.reduce((acc, item) => acc + item.totalPrice, 0);
    setSubtotal(total);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const generatePDF = () => {
    // const doc = new jsPDF();
    // doc.setFont("times", "normal"); // Font hỗ trợ tiếng Việt
    // doc.text("Hóa Đơn Mua Hàng", 20, 20);
    // autoTable(doc, {
    //   head: [["Sản phẩm", "Số lượng", "Giá (VND)"]],
    //   body: cartItems.map((item) => [
    //     item.productName,
    //     item.quantity,
    //     item.totalPrice.toLocaleString(),
    //   ]),
    // });
    // const finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY : 30;
    // doc.text(`Tổng cộng: ${totalPrice.toLocaleString()} VND`, 20, finalY + 10);
    // doc.text(`Địa chỉ: ${address}`, 20, finalY + 20);
    // doc.text(`Ghi chú: ${note}`, 20, finalY + 30);
    // doc.save("hoa-don.pdf");
  };

  const createOrder = async () => {
    try {
      const orderData = {
        totalPrice: subtotal,
        status: "Pending",
        orderDetails: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.totalPrice,
        })),
      };

      const response = await fetch(
        `${config.API_BASE_URL}/Orders/createOrder`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(orderData),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Failed to create order");
      }

      const result = await response.json();
      toast.success(result.message, {
        position: "top-left",
      });
      setCartUpdated((prev) => !prev);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Container
        maxWidth="sm"
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h5" gutterBottom textAlign="center">
            <ShoppingCartIcon fontSize="large" /> Xác nhận đơn hàng
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            {cartItems.map((item) => (
              <Grid item xs={12} key={item.id}>
                <Card component={motion.div} whileHover={{ scale: 1.02 }}>
                  <CardContent>
                    <Typography variant="h6">{item.productName}</Typography>
                    <Typography variant="body2">
                      Số lượng: {item.quantity}
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {item.totalPrice.toLocaleString()} VND
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Typography variant="h6" fontWeight="bold" mt={2} textAlign="center">
            Tổng tiền: {subtotal.toLocaleString()} VNĐ
          </Typography>
          <TextField
            fullWidth
            label="Địa chỉ giao hàng"
            variant="outlined"
            margin="normal"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            InputProps={{
              startAdornment: <HomeIcon color="primary" sx={{ mr: 1 }} />,
            }}
          />
          <TextField
            fullWidth
            label="Ghi chú"
            variant="outlined"
            margin="normal"
            multiline
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            InputProps={{
              startAdornment: <NotesIcon color="primary" sx={{ mr: 1 }} />,
            }}
          />
          <Button
            variant="contained"
            color="success"
            fullWidth
            onClick={createOrder}
            sx={{ mt: 2 }}
            startIcon={<CheckCircleIcon />}
            component={motion.div}
            whileHover={{ scale: 1.05 }}
            disabled={subtotal === 0}
          >
            Đặt hàng & In hóa đơn
          </Button>

          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={() => navigate("/shop1")}
            sx={{ mt: 2 }}
            startIcon={<HomeIcon />}
            component={motion.div}
            whileHover={{ scale: 1.05 }}
          >
            Tiếp tục mua sắm
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default CheckoutPage;
