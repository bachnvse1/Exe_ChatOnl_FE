import React, { useState } from "react";
import {
  AppBar,
  Tabs,
  Tab,
  Box,
  Typography,
  Paper,
  Toolbar,
  Button,
} from "@mui/material";
import { People, Inventory, ShoppingCart } from "@mui/icons-material";
import Users from "./Users";
import Products from "./Product";
import Orders from "./Order";
import OrderDetail from "./OrderDetail";
import Footer from "../A_Home/footer";
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 4 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};
const handleLogout = () => {
  sessionStorage.removeItem("token");
  window.location.href = "/";
};

const AdminPage = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      {/* AppBar */}
      <AppBar position="static" sx={{ backgroundColor: "orange" }}>
        <Toolbar>
          <Typography variant="h6">Trang chủ quản lí</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit" onClick={handleLogout}>
            Đăng xuất
          </Button>
        </Toolbar>
      </AppBar>

      {/* Tabs */}
      <Paper sx={{ margin: "20px", padding: "20px" }}>
        <Tabs value={value} onChange={handleChange} aria-label="admin tabs">
          <Tab icon={<People />} label="Danh sách người dùng" />
          <Tab icon={<Inventory />} label="Danh sách sản phẩm" />
          <Tab icon={<ShoppingCart />} label="Danh sách đơn hàng đã bán" />
          <Tab icon={<Inventory />} label="Chi tiết đơn hàng" />
        </Tabs>

        {/* Tab Panels */}
        <TabPanel value={value} index={0}>
          <Users />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Products />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Orders />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <OrderDetail />
        </TabPanel>
      </Paper>
      <Footer />
    </div>
  );
};

export default AdminPage;
