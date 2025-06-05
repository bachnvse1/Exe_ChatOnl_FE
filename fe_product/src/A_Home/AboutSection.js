import React from "react";

// Bạn có thể dùng icon SVG inline hoặc import từ thư viện icons nếu cần.
const AboutSection = () => (
  <section
    style={{ background: "#fff", padding: "40px 0", textAlign: "center" }}
  >
    <h2
      style={{
        color: "#4660a0",
        fontWeight: 400,
        fontSize: "2rem",
        marginBottom: "8px",
      }}
    >
      Optimize your surveillance network with{" "}
      <span style={{ color: "#4660a0", fontWeight: 500 }}>
        Secure City Solutions
      </span>
    </h2>
    <p
      style={{
        fontStyle: "italic",
        color: "#444",
        fontSize: "1.14rem",
        marginBottom: "38px",
      }}
    >
      Highly customizable, adaptable live stream compression software
    </p>
    <hr style={{ margin: "30px auto", width: "95%" }} />

    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: 40,
        flexWrap: "wrap",
        marginBottom: 44,
      }}
    >
      <div style={{ width: 260, minWidth: 210 }}>
        <div
          style={{
            margin: "0 auto 16px",
            width: 80,
            height: 80,
            background: "#4660a0",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Thumb up SVG */}
          <svg width="38" height="38" viewBox="0 0 24 24" fill="#fff">
            <path d="M2 20h2c.552 0 1-.447 1-1v-7c0-.553-.448-1-1-1h-2v9zm19.5-9.926c-.253-.344-.631-.574-1.051-.648l-7.027-1.239.574-3.675c.043-.286-.044-.578-.243-.796-.196-.216-.484-.335-.771-.314-.469.038-.865.363-.97.814l-1.186 5.03c-.113.481.008.992.321 1.358.312.366.788.57 1.283.546l5.388-.198-.878 3.822c-.06.262-.012.537.129.766.141.229.373.387.638.421l5.905.787c.456.06.887-.18 1.077-.605.189-.426.084-.928-.273-1.204l-5.033-4.191zm-6.229 1.271c-.17 0-.331-.094-.416-.246-.096-.169-.089-.38.018-.541l.768-1.163c.092-.14.25-.222.42-.212.169.011.315.116.38.277l.501 1.346c.058.157.009.333-.127.454-.137.12-.332.131-.474.035l-1.07-.682z" />
          </svg>
        </div>
        <h3 style={{ fontSize: "1.25rem", fontWeight: 400 }}>Why us?</h3>
        <p style={{ fontSize: "1rem", color: "#444" }}>
          Our products provide{" "}
          <span style={{ fontStyle: "italic", color: "#4660a0" }}>
            voice interoperability
          </span>{" "}
          and{" "}
          <span style={{ fontStyle: "italic", color: "#4660a0" }}>
            video/data collaboration
          </span>
          , as well as{" "}
          <span style={{ fontStyle: "italic", color: "#4660a0" }}>
            compression services
          </span>{" "}
          to minimize the digital footprint of videos.
        </p>
      </div>
      <div style={{ width: 260, minWidth: 210 }}>
        <div
          style={{
            margin: "0 auto 16px",
            width: 80,
            height: 80,
            background: "#4660a0",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Group SVG */}
          <svg width="38" height="38" viewBox="0 0 24 24" fill="#fff">
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3s-1.33-3-2.99-3-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3s-1.33-3-2.99-3-3 1.34-3 3 1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5v2.5h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45v2.5h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
          </svg>
        </div>
        <h3 style={{ fontSize: "1.25rem", fontWeight: 400 }}>Our cause</h3>
        <p style={{ fontSize: "1rem", color: "#444" }}>
          To offer robust solutions that{" "}
          <span style={{ fontStyle: "italic", color: "#4660a0" }}>
            enhance operational effectiveness and productivity
          </span>{" "}
          more than four times and{" "}
          <span style={{ fontStyle: "italic", color: "#4660a0" }}>
            reduce costs by 75%
          </span>{" "}
          when compared to others in the market today.
        </p>
      </div>
      <div style={{ width: 260, minWidth: 210 }}>
        <div
          style={{
            margin: "0 auto 16px",
            width: 80,
            height: 80,
            background: "#4660a0",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Trophy SVG */}
          <svg width="38" height="38" viewBox="0 0 24 24" fill="#fff">
            <path d="M17 3c0-1.104-.896-2-2-2h-6c-1.104 0-2 .896-2 2h-3v3c0 3.394 2.642 6.167 6 6.721v1.279h-2c-.552 0-1 .447-1 1v2c0 1.654 1.346 3 3 3s3-1.346 3-3v-2c0-.553-.448-1-1-1h-2v-1.279c3.358-.554 6-3.327 6-6.721v-3h-3zm-2 15c0 .552-.447 1-1 1s-1-.448-1-1v-2h2v2zm3-10.29c-.381 2.241-2.242 3.963-4.5 3.963s-4.119-1.722-4.5-3.963v-.71h9v.71zm3-2.71v-1h-3v1h3z" />
          </svg>
        </div>
        <h3 style={{ fontSize: "1.25rem", fontWeight: 400 }}>Awards</h3>
        <p style={{ fontSize: "1rem", color: "#444" }}>
          Secure City Solutions was recognized with Invest Ottawa’s{" "}
          <span style={{ fontStyle: "italic", color: "#4660a0" }}>
            Rising Star
          </span>{" "}
          twice, named{" "}
          <span style={{ fontStyle: "italic", color: "#4660a0" }}>
            A Start-up to Watch (2013)
          </span>{" "}
          by the Ottawa Business Journal, and recipient of{" "}
          <span style={{ fontStyle: "italic", color: "#4660a0" }}>
            NRC-IRAP funding
          </span>
          .
        </p>
      </div>
    </div>

    <hr style={{ margin: "30px auto", width: "95%" }} />
  </section>
);

export default AboutSection;
