import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthCallback = () => {
  const navigate = useNavigate();
  const handled = useRef(false);

  useEffect(() => {
    if (handled.current) return;

    const query = new URLSearchParams(window.location.search);
    const token = query.get("token");
    const username = query.get("username");
    const isAdmin = query.get("isAdmin") === "true";
    const imgUrl = query.get("imageUrl");

    if (token) {
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("isAdmin", isAdmin.toString());
      sessionStorage.setItem("imgUrl", imgUrl);

      toast.success(`Đăng nhập thành công! Xin chào ${username}`, {
        position: "top-left",
        autoClose: 5000,
      });

      handled.current = true;
      navigate(isAdmin ? "/dashboard" : "/shop1");
    } else {
      toast.error("Đăng nhập thất bại!", {
        position: "top-left",
      });
      navigate("/");
    }
  }, [navigate]);

  return <div>Đang xử lý đăng nhập...</div>;
};

export default AuthCallback;
