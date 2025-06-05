// src/A_Home/HeroSection.js
import imgLogo from "../A_Home/logo.new.bmp";
export default function HeroSection() {
  return (
    <section
      style={{
        background: "#eaf2f8",
        padding: "60px 0 50px 0",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "420px",
          position: "relative",
          backgroundImage: `url(https://securecitysolutions.com/img/background1.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Lớp phủ mờ */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.18)",
            backdropFilter: "blur(2.5px)",
          }}
        ></div>
        {/* Logo SCS */}
        <img
          src={imgLogo}
          alt="Secure City Solutions logo"
          style={{
            position: "relative",
            zIndex: 2,
            width: 210,
            height: 210,
            objectFit: "cover", // Có thể giữ "contain" nếu muốn hiển thị trọn vẹn logo
            filter: "drop-shadow(0 2px 18px #0006)",
            borderRadius: "50%", // Quan trọng để ảnh thành hình tròn
            border: "4px solid #fff", // Nếu muốn có viền trắng xung quanh (tùy chọn)
            background: "#fff", // Nền trắng bên ngoài logo (tùy chọn)
          }}
        />
      </div>
    </section>
  );
}
