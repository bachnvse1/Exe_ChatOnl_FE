export default function Footer2() {
  return (
    <footer
      style={{
        background: "#6187ab",
        color: "#fff",
        textAlign: "center",
        padding: "44px 0 20px 0",
        fontFamily: "Montserrat, Arial, sans-serif",
      }}
    >
      {/* Tên tổ chức */}
      <div
        style={{
          fontSize: "2.1rem",
          letterSpacing: 2,
          fontWeight: 500,
          textTransform: "uppercase",
        }}
      >
        Trung tâm nghiên cứu, ứng dụng khoa học kỹ thuật và chuyển giao công
        nghệ - T07, Bộ Công An
      </div>

      {/* Slogan hoặc mô tả */}
      <div
        style={{
          margin: "18px 0 32px 0",
          letterSpacing: 2,
          fontSize: "1.08rem",
          fontWeight: 500,
          color: "#f4f8fd",
        }}
      >
        Thông tin liên hệ
      </div>

      {/* Thông tin liên hệ */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 56,
          maxWidth: 880,
          margin: "0 auto 24px auto",
          flexWrap: "wrap",
        }}
      >
        {/* Địa chỉ */}
        <div
          style={{
            borderRight: "1px solid #bdd0e2",
            paddingRight: 40,
            minWidth: 260,
            textAlign: "left",
            fontSize: "1.07rem",
            letterSpacing: 0.4,
            fontWeight: 400,
            marginBottom: 12,
          }}
        >
          <div>
            <span style={{ fontWeight: 500 }}>Trụ sở:</span>
            <br />
            Phường Hồ, Thị xã Thuận Thành,
            <br />
            Tỉnh Bắc Ninh
          </div>
        </div>
        {/* Email và hotline */}
        <div
          style={{
            paddingLeft: 40,
            textAlign: "left",
            minWidth: 220,
            fontSize: "1.07rem",
            letterSpacing: 0.4,
            fontWeight: 400,
          }}
        >
          <div>
            <span style={{ fontWeight: 500 }}>Email:</span>{" "}
            <a
              href="mailto:cgcn.t2@gmail.com"
              style={{
                color: "#fff",
                textDecoration: "underline",
                fontWeight: 400,
              }}
            >
              cgcn.t2@gmail.com
            </a>
          </div>
          <div style={{ marginTop: 10 }}>
            <span style={{ fontWeight: 500 }}>Hotline:</span> 082.979.2222
          </div>
        </div>
      </div>

      {/* Chính sách và bản quyền */}
      <div
        style={{
          marginTop: 24,
          fontSize: "0.99rem",
          color: "#e0e8f5",
          letterSpacing: 1,
        }}
      >
        <a
          href="#"
          style={{
            color: "#fff",
            textDecoration: "underline",
            marginRight: 16,
            fontWeight: 400,
          }}
        >
          Chính sách bảo mật
        </a>
        |
        <span style={{ marginLeft: 16 }}>
          &copy; {new Date().getFullYear()} Trung tâm nghiên cứu, ứng dụng khoa
          học kỹ thuật và chuyển giao công nghệ - T07, Bộ Công An. All rights
          reserved.
        </span>
      </div>
    </footer>
  );
}
