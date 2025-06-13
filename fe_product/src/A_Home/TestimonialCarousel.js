import React, { useEffect, useRef, useState } from "react";

import img1 from "./anh1.jpg";
import img2 from "./anh2.jpg";
import img3 from "./anh3.jpg";
import img4 from "./anh4.jpg";

const images = [img1, img2, img3, img4];
const INTERVAL = 3000; // 3s
const SLIDE_DURATION = 600; // ms

const ImageGallery = () => {
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState(null); // Số thứ tự ảnh sắp xuất hiện
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState(1); // 1: sang phải, -1: sang trái
  const timerRef = useRef();

  // Tự động chuyển ảnh
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      slideTo((current + 1) % images.length, 1);
    }, INTERVAL);
    return () => clearTimeout(timerRef.current);
    // eslint-disable-next-line
  }, [current]);

  // Hàm chuyển sang ảnh tiếp theo
  const slideTo = (idx, dir = 1) => {
    if (animating || idx === current) return;
    setNext(idx);
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setAnimating(false);
      setNext(null);
    }, SLIDE_DURATION);
  };

  // Khi click dot
  const handleDot = (idx) => {
    if (idx === current) return;
    const dir =
      idx > current || (current === images.length - 1 && idx === 0) ? 1 : -1;
    clearTimeout(timerRef.current);
    slideTo(idx, dir);
  };

  return (
    <div
      style={{
        background: "#f7fafc",
        padding: "44px 0 36px 0",
        width: "100%",
        minHeight: 400,
      }}
    >
      <div
        style={{
          textAlign: "center",
          fontWeight: 600,
          fontSize: "2rem",
          marginBottom: 44,
          letterSpacing: 1,
          color: "#23426a",
          textTransform: "uppercase",
        }}
      >
        Lễ ký kết hợp tác giữa Trung tâm T2 và công ty Mismart
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
          height: 520,
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 550,
            height: 550,
            position: "relative",
            overflow: "hidden",
            border: "8px solid #fff",
            background: "#e9ecef",
            boxShadow: "0 8px 32px 0 rgba(68, 87, 116, 0.18)",
          }}
        >
          {/* Ảnh hiện tại */}
          <img
            src={images[current]}
            alt={`Slide ${current + 1}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 2,
              transform:
                animating && direction === 1
                  ? "translateX(-100%)"
                  : animating && direction === -1
                  ? "translateX(100%)"
                  : "translateX(0)",
              opacity: animating ? 0.7 : 1,
              transition: animating
                ? `transform ${SLIDE_DURATION}ms cubic-bezier(.65,.05,.36,1), opacity ${SLIDE_DURATION}ms`
                : "none",
              boxShadow: animating
                ? "0 6px 40px 0 rgba(33,50,88,0.13)"
                : "0 8px 32px 0 rgba(68,87,116,0.18)",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform += " scale(1.04)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.transform =
                e.currentTarget.style.transform.replace(" scale(1.04)", ""))
            }
          />
          {/* Ảnh kế tiếp (slide vào) */}
          {animating && next !== null && (
            <img
              src={images[next]}
              alt={`Slide ${next + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 3,
                transform:
                  direction === 1 ? "translateX(100%)" : "translateX(-100%)",
                opacity: 1,
                animation: `slide-in-${
                  direction === 1 ? "right" : "left"
                } ${SLIDE_DURATION}ms cubic-bezier(.65,.05,.36,1) forwards`,
                boxShadow: "0 6px 40px 0 rgba(33,50,88,0.13)",
              }}
            />
          )}
          {/* Keyframes động inline */}
          <style>
            {`
            @keyframes slide-in-right {
              0% { transform: translateX(100%); }
              100% { transform: translateX(0); }
            }
            @keyframes slide-in-left {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(0); }
            }
            `}
          </style>
        </div>
      </div>
      {/* Dot navigation */}
      <div
        style={{
          marginTop: 32,
          display: "flex",
          justifyContent: "center",
          gap: 16,
        }}
      >
        {images.map((_, idx) => (
          <span
            key={idx}
            onClick={() => handleDot(idx)}
            style={{
              display: "inline-block",
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: current === idx ? "#23426a" : "#bcc7d4",
              cursor: "pointer",
              border: current === idx ? "3px solid #6187ab" : "2px solid #fff",
              transition: "background 0.3s,border 0.3s",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
