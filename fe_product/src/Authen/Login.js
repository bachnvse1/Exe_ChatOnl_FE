import React, { useState } from "react";
import axios from "axios";
import "../css/login.css";
import { useNavigate } from "react-router-dom";
import config from "../config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bg from "../images/backgound2.jpg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        `${config.API_BASE_URL}/Users/login`,
        {
          username,
          password,
        },
        {
          withCredentials: true, // 👈 Thêm cái này nếu backend cần cookie/token
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data?.success) {
        const userInfo = response.data;

        // Lưu vào sessionStorage
        sessionStorage.setItem("token", userInfo.token);
        sessionStorage.setItem("username", userInfo.username);
        sessionStorage.setItem("isAdmin", userInfo.isAdmin ? "true" : "false");
        toast.success(`Đăng nhập thành công ! ${userInfo.username}`, {
          position: "top-left",
        });
        if (userInfo.isAdmin) {
          navigate("/dashboard");
        } else navigate("/shop1");
      } else {
        toast.error(`${response.data?.message} || "Đăng nhập thất bại!"`, {
          position: "top-left",
        });
      }
    } catch (error) {
      toast.error(`${error.response?.data?.message}`, {
        position: "top-left",
      });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        `${config.API_BASE_URL}/Users/register`,
        {
          username,
          email,
          password,
        }
      );

      if (response.data.flag === false) {
        toast.success(`${response.data.message}`, {
          position: "top-left",
        });
        setIsRegistering(false);
      } else if (response.data.flag === true) {
        toast.error(`${response.data.message}`, {
          position: "top-left",
        });
      }
    } catch (error) {
      toast.error(`Trùng tên đăng nhập hoặc email`, {
        position: "top-left",
      });
      setError(error.response?.data?.message || "Đăng kí thất bại");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#D2B48C",
        backgroundImage: `url(${bg})`,
        backgroundSize: "contain", // Hoặc "auto"
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat", // Ngăn ảnh lặp lại
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
          backgroundColor: "#fff",
          padding: "32px",
          borderRadius: "16px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          maxWidth: "80%", // Giới hạn kích thước của nội dung bên trong
          textAlign: "center",
        }}
      >
        <h2
          style={{
            marginBottom: "16px",
            color: "#F7941D",
            fontSize: "24px",
          }}
        >
          {isRegistering ? "Đăng kí" : "Đăng nhập"}
        </h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form
          onSubmit={isRegistering ? handleRegister : handleLogin}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              width: "250px",
              padding: "12px",
              border: "2px solid #F7941D",
              borderRadius: "8px",
              outline: "none",
              fontSize: "16px",
            }}
          />
          {isRegistering && (
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "250px",
                padding: "12px",
                border: "2px solid #F7941D",
                borderRadius: "8px",
                outline: "none",
                fontSize: "16px",
              }}
            />
          )}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "250px",
              padding: "12px",
              border: "2px solid #F7941D",
              borderRadius: "8px",
              outline: "none",
              fontSize: "16px",
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: "#F7941D",
              color: "#fff",
              padding: "12px 24px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            {isRegistering ? "Đăng kí" : "Đăng nhập"}
          </button>
        </form>

        <p>
          {isRegistering ? "Bạn đã có tài khoản?" : "Ban chưa có tài khoản?"}{" "}
          <span
            style={{ color: "#28a745", cursor: "pointer" }}
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering ? "Đăng nhập" : "Đăng kí"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
