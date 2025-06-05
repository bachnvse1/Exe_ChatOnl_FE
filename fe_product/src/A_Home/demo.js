import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import placeholder2 from "./placeholder2.png";
import placeholder3 from "./placeholder3.png";
import placeholder4 from "./placeholder4.png";

const productData = [
  {
    title: "Phần mềm rà quét lỗ hổng web",
    subtitle: "Web Vulnerability Scanner",
    imgAlt: "Phần mềm rà quét lỗ hổng web",
    // Thay bằng đường dẫn ảnh nếu có
    image: "",
    description: (
      <>
        <b>
          Công cụ hỗ trợ tìm kiếm phát hiện các lỗ hổng bảo mật trên các ứng
          dụng Web
        </b>
        , có thể phát hiện các lỗ hổng phổ biến như SQL injection, XSS
        (Cross-Site Scripting), CSRF...
        <ul style={{ marginTop: 8, marginBottom: 8, lineHeight: "1.5" }}>
          <li>
            Kiểm tra trạng thái phản hồi từ server, hiển thị thông tin chi tiết
          </li>
          <li>Quét cổng, liệt kê dịch vụ đang hoạt động</li>
          <li>Xác thực chứng chỉ SSL (HTTPS)</li>
          <li>Phát hiện và phân loại công nghệ website (CMS, framework,...)</li>
          <li>Phân tích HSTS, X-Frame-Options, CSP, Referrer Policy</li>
          <li>Kiểm tra nguy cơ tấn công Injection (SQL, NoSQL)</li>
          <li>Phát hiện lỗ hổng Cross-Site Scripting (XSS)</li>
          <li>Tìm kiếm thư mục/tệp tin ẩn</li>
          <li>Đánh giá, chấm điểm mức độ bảo mật (A-F)</li>
          <li>Kiểm tra việc sử dụng Secure Cookie</li>
          <li>Đối chiếu với cơ sở dữ liệu liên kết độc hại</li>
          <li>Cung cấp khả năng báo cáo liên kết độc hại</li>
          <li>Chụp ảnh màn hình website</li>
          <li>Xuất báo cáo phân tích chi tiết</li>
          <li>Phân tích chuyên sâu dựa trên công nghệ AI</li>
        </ul>
      </>
    ),
    btnText: "Tìm hiểu thêm",
    btnLink: "#webscanner",
  },
  {
    title: "Hệ thống nhận dạng & phân tách giọng nói, chuyển đổi thành văn bản",
    subtitle: "Speech Recognition System",
    imgAlt: "Hệ thống nhận dạng giọng nói",
    image: placeholder2,
    description: (
      <>
        <b>Hệ thống nhận dạng giọng nói (Speech Recognition System)</b> cho phép
        máy tính nhận diện và hiểu được lời nói của con người, thu thập và phân
        tách giọng nói từng người, chuyển đổi thành văn bản với AI.
        <br />
        <br />
        <b>Chức năng nổi bật:</b>
        <ul style={{ marginTop: 8, marginBottom: 8 }}>
          <li>
            <b>Định danh giọng nói:</b> AI xác định người nói chính xác, cần ít
            dữ liệu, ổn định với dữ liệu lớn, nhận dạng tốt trong môi trường
            nhiễu.
          </li>
          <li>
            <b>Phân tách giọng nói:</b> AI chia kênh giọng nói chính xác, xử lý
            nhiều định dạng âm thanh, phù hợp dữ liệu lớn.
          </li>
          <li>
            <b>Chuyển đổi giọng nói thành văn bản:</b> AI chuyển âm thanh thành
            text, tốc độ nhanh, độ chính xác cao.
          </li>
        </ul>
      </>
    ),
    btnText: "Tìm hiểu thêm",
    btnLink: "#speech",
  },
  {
    title: "Phần mềm tác nghiệp điều hành văn bản & kho lưu trữ số",
    subtitle: "Document Management Platform",
    imgAlt: "Phần mềm tác nghiệp điều hành",
    image: placeholder3,
    description: (
      <>
        <b>Phần mềm điều hành, quản lý văn bản, lưu trữ số</b> giúp tổ chức quản
        lý và điều hành công việc hiệu quả, với nhiều tính năng như quản lý văn
        bản, giao tiếp, lưu trữ và tìm kiếm thông tin.
        <br />
        <i>Mô hình phần mềm gồm 12 module chính (tham khảo sơ đồ minh họa)</i>
      </>
    ),
    btnText: "Tìm hiểu thêm",
    btnLink: "#document",
  },
  {
    title: "Hệ thống kiểm soát ra/vào cơ quan tích hợp thẻ CCCD",
    subtitle: "Access Control with Citizen ID Integration",
    imgAlt: "Kiểm soát ra vào tích hợp CCCD",
    image: placeholder4,
    description: (
      <>
        <b>Giải pháp kiểm soát phương tiện & con người ra/vào cơ quan</b> bằng
        tích hợp thẻ CCCD, barie và camera:
        <br />
        <ul style={{ marginTop: 8, marginBottom: 8 }}>
          <li>
            Tự động nhận diện biển số xe/căn cước/kiểm tra sinh trắc học để mở
            barie
          </li>
          <li>Lưu thông tin khách/biển số/thẻ CCCD khi làm thủ tục ra vào</li>
          <li>Đăng ký lịch làm việc, quản lý lịch trình vào ra của cán bộ</li>
        </ul>
      </>
    ),
    btnText: "Tìm hiểu thêm",
    btnLink: "#access",
  },
  {
    title: "Phần mềm nhận dạng tiếng Việt (T2OCR)",
    subtitle: "Vietnamese OCR",
    imgAlt: "Phần mềm OCR tiếng Việt",
    image: "/placeholder5.png",
    description: (
      <>
        <b>T2OCR</b> là giải pháp nhận dạng ký tự tiếng Việt dựa trên lõi
        Tesseract OCR:
        <br />
        <ul style={{ marginTop: 8, marginBottom: 8 }}>
          <li>Độ chính xác trên 95%</li>
          <li>Hỗ trợ định dạng PDF, JPEG, PNG, BMP...</li>
          <li>Tách bảng, tách trang, xử lý ảnh nâng cao</li>
          <li>Cài đặt, sử dụng offline, bảo mật tuyệt đối</li>
        </ul>
      </>
    ),
    btnText: "Tìm hiểu thêm",
    btnLink: "#ocr",
  },
  {
    title: "Thiết bị vô hiệu hóa hoạt động ghi âm (T2AR)",
    subtitle: "Audio Recording Neutralizer",
    imgAlt: "Thiết bị chống ghi âm",
    image: "/placeholder6.png",
    description: (
      <>
        <b>Thiết bị vô hiệu hóa ghi âm T2AR</b> sử dụng công nghệ Voice
        Canceller:
        <br />
        <ul style={{ marginTop: 8, marginBottom: 8 }}>
          <li>Kích thước nhỏ gọn, dùng nguồn AC 220V hoặc Battery</li>
          <li>Triệt tiêu tín hiệu thu từ Microphone, không gây tiếng ồn</li>
          <li>Hiệu quả trong phòng họp, phạm vi góc 120&deg;</li>
        </ul>
      </>
    ),
    btnText: "Tìm hiểu thêm",
    btnLink: "#t2ar",
  },
];

export default function FlagshipProducts() {
  return (
    <div style={{ background: "", padding: "40px 0 0 0" }}>
      <div
        style={{
          maxWidth: 1150,
          margin: "0 auto",
          background: "#fff",
          borderRadius: "10px 10px 0 0",
          overflow: "hidden",
          boxShadow: "0 2px 14px 0 rgba(60,60,120,.05)",
        }}
      >
        <div
          style={{
            background: "#6b93b3",
            color: "#fff",
            padding: "32px 0 20px 0",
            textAlign: "center",
            fontSize: "2.5rem",
            fontWeight: 400,
            letterSpacing: 2,
          }}
        >
          FLAGSHIP PRODUCTS
        </div>
        <div
          style={{
            background: "#f7fafd",
            textAlign: "center",
            padding: "26px 0 16px 0",
          }}
        >
          <span
            style={{ letterSpacing: 6, fontSize: "1.6rem", color: "#37475a" }}
          >
            <b>OMNI</b>
            <span style={{ color: "#6b93b3" }}>SOLUTIONS</span>
          </span>
        </div>
        {productData.map((p, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              alignItems: "center",
              borderTop: idx > 0 ? "1px solid #e0e4ea" : "none",
              padding: "32px 40px",
              flexWrap: "wrap",
              justifyContent: "center",
              // Responsive cho mobile
              flexDirection: window.innerWidth <= 700 ? "column" : "row",
            }}
          >
            {/* Ảnh/visual bên trái */}
            <div
              style={{
                flex: "0 0 340px",
                marginRight: 40,
                minWidth: 290,
                textAlign: "center",
                marginBottom: window.innerWidth <= 700 ? 20 : 0,
              }}
            >
              <div
                style={{
                  width: 300,
                  height: 200,
                  background: "#dde8f3",
                  borderRadius: 10,
                  margin: "0 auto 14px auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  color: "#7e99b6",
                  fontWeight: 500,
                }}
              >
                {/* Có thể thay bằng <img src={p.image} alt={p.imgAlt} style={{width: "92%", borderRadius: 10}} /> */}
                <img
                  src={p.image}
                  alt={p.imgAlt}
                  style={{ width: "92%", borderRadius: 10 }}
                />
              </div>
              <div style={{ color: "#6b93b3", fontWeight: 600, fontSize: 16 }}>
                {p.subtitle}
              </div>
            </div>
            {/* Nội dung mô tả bên phải */}
            <div
              style={{
                flex: 1,
                minWidth: 280,
                padding: "10px 0",
                color: "#31455b",
              }}
            >
              <div
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 600,
                  marginBottom: 8,
                  color: "#314c6c",
                }}
              >
                {p.title}
              </div>
              <div style={{ fontSize: "1.08rem", marginBottom: 12 }}>
                {p.description}
              </div>
              <a
                href={p.btnLink}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  background: "#6b93b3",
                  color: "#fff",
                  padding: "10px 30px",
                  fontSize: "1.1rem",
                  borderRadius: 7,
                  marginTop: 10,
                  textDecoration: "none",
                  fontWeight: 500,
                  transition: "background .15s",
                }}
              >
                <FaExternalLinkAlt style={{ marginRight: 9 }} />
                {p.btnText}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
