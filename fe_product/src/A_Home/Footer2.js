export default function Footer2() {
  return (
    <footer
      style={{
        background: "#6187ab",
        color: "#fff",
        textAlign: "center",
        padding: "54px 0 56px 0",
        fontFamily: "Montserrat, Arial, sans-serif",
      }}
    >
      <div style={{ fontSize: "2.1rem", letterSpacing: 3, fontWeight: 400 }}>
        SECURE CITY SOLUTIONS
      </div>
      <div
        style={{
          margin: "20px 0 38px 0",
          letterSpacing: 4,
          fontSize: "1.08rem",
          fontWeight: 500,
          color: "#f4f8fd",
        }}
      >
        Augmenting Networks Everywhere
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 64,
          maxWidth: 800,
          margin: "0 auto",
        }}
      >
        {/* Cột Email */}
        <div
          style={{
            borderRight: "1px solid #bdd0e2",
            paddingRight: 40,
            minWidth: 240,
          }}
        >
          <a
            href="mailto:info@securecitysolutions.com"
            style={{
              color: "#fff",
              textDecoration: "none",
              fontSize: "1.05rem",
              letterSpacing: 1,
              fontWeight: 400,
            }}
          >
            info@securecitysolutions.com
          </a>
        </div>
        {/* Cột Địa chỉ */}
        <div
          style={{
            paddingLeft: 40,
            textAlign: "left",
            minWidth: 260,
            fontSize: "1.08rem",
            letterSpacing: 0.4,
          }}
        >
          135 Michael Cowpland Drive
          <br />
          Suite 240
          <br />
          Kanata, ON, Canada
          <br />
          K2M 2E9
          <br />
          <a
            href="#"
            style={{
              color: "#fff",
              textDecoration: "underline",
              fontSize: "1rem",
            }}
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
