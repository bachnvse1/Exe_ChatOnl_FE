import React, { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  // Ẩn hiện menu khi màn nhỏ
  return (
    <header
      style={{
        background: "#6b93b3",
        position: "sticky",
        top: 0,
        zIndex: 20,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
          padding: "0 10px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src="/logo192.png"
            alt="Logo"
            style={{ height: 38, marginRight: 12 }}
          />
          <span
            style={{
              color: "#fff",
              fontWeight: 700,
              fontSize: 22,
              letterSpacing: 1,
              display: "none",
              // Show logo text only on desktop
              "@media (min-width:700px)": { display: "inline" },
            }}
          >
            SECURE CITY
          </span>
        </div>
        {/* Hamburger menu */}
        <div
          style={{
            display: "none",
            cursor: "pointer",
            "@media (max-width:700px)": { display: "block" },
          }}
          onClick={() => setOpen(!open)}
        >
          <div
            style={{
              width: 28,
              height: 3,
              background: "#fff",
              margin: "6px 0",
            }}
          />
          <div
            style={{
              width: 28,
              height: 3,
              background: "#fff",
              margin: "6px 0",
            }}
          />
          <div
            style={{
              width: 28,
              height: 3,
              background: "#fff",
              margin: "6px 0",
            }}
          />
        </div>
        {/* Menu */}
        <nav
          style={{
            flex: 1,
            display: open ? "block" : "flex",
            justifyContent: "center",
            alignItems: "center",
            "@media (max-width:700px)": {
              position: "absolute",
              background: "#6b93b3",
              top: 64,
              left: 0,
              width: "100%",
              zIndex: 22,
              display: open ? "block" : "none",
            },
          }}
        >
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              margin: 0,
              padding: 0,
              gap: 26,
              flexDirection: open ? "column" : "row",
              alignItems: "center",
              "@media (max-width:700px)": {
                flexDirection: "column",
                padding: 0,
                gap: 0,
              },
            }}
          >
            <li>
              <a
                href="#"
                style={{
                  color: "#fff",
                  textDecoration: "none",
                  fontWeight: 500,
                  padding: "13px 16px",
                  display: "block",
                }}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                style={{
                  color: "#fff",
                  textDecoration: "none",
                  fontWeight: 500,
                  padding: "13px 16px",
                  display: "block",
                }}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                style={{
                  color: "#fff",
                  textDecoration: "none",
                  fontWeight: 500,
                  padding: "13px 16px",
                  display: "block",
                }}
              >
                Products
              </a>
            </li>
            <li>
              <a
                href="#"
                style={{
                  color: "#fff",
                  textDecoration: "none",
                  fontWeight: 500,
                  padding: "13px 16px",
                  display: "block",
                }}
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
        <a
          href="#"
          style={{
            background: "#fff",
            color: "#6b93b3",
            borderRadius: 6,
            padding: "10px 18px",
            textDecoration: "none",
            fontWeight: 600,
            marginLeft: 12,
            fontSize: "1rem",
            whiteSpace: "nowrap",
            display: "none",
            "@media (min-width:700px)": { display: "inline-block" },
          }}
        >
          Request a Demo
        </a>
      </div>
    </header>
  );
}
