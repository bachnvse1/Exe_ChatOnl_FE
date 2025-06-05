import React, { useState } from "react";

const testimonials = [
  {
    flag: "https://securecitysolutions.com/img/flagUK.svg",
    quote:
      "The Secure City Solutions technology is well embedded in the Canadian EDGE Innovation Centres with the ability to solve complex problems for our public safety first responders.",
    author: "— EDGE Innovation Business Manager",
  },
  {
    flag: "https://securecitysolutions.com/img/flagCanada.png",
    quote:
      "Secure City Solutions products take a truly unique approach to secure communications. They are proven reliable and with such a small form factor while offered at a relatively low cost.",
    author: "— Retired Executive manager from United Kingdom",
  },
  {
    flag: "https://securecitysolutions.com/img/flagCanada.png",
    quote:
      "Secure City Solutions brings innovation and reliability to our operations, allowing us to scale efficiently and securely.",
    author: "— Technology Lead from United States",
  },
];

const TestimonialCarousel = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );

  return (
    <div style={{ textAlign: "center", padding: "36px 0 0" }}>
      <h3
        style={{ fontWeight: 400, fontSize: "1.35rem", marginBottom: "18px" }}
      >
        Hear what our clients have to say
      </h3>
      <div style={{ minHeight: 180 }}>
        <img
          src={testimonials[current].flag}
          alt="Flag"
          style={{ width: 56, height: "auto", marginBottom: 12 }}
        />
        <blockquote
          style={{
            fontSize: "1.08rem",
            color: "#444",
            maxWidth: 480,
            margin: "0 auto",
            marginBottom: 10,
            lineHeight: "1.6",
            fontStyle: "normal",
            minHeight: 65,
          }}
        >
          <span
            style={{ fontSize: 22, verticalAlign: "middle", color: "#aaa" }}
          >
            “
          </span>
          {testimonials[current].quote}
          <span
            style={{ fontSize: 22, verticalAlign: "middle", color: "#aaa" }}
          >
            ”
          </span>
          <footer
            style={{
              marginTop: 12,
              color: "#888",
              fontStyle: "italic",
              fontSize: "0.97rem",
            }}
          >
            {testimonials[current].author}
          </footer>
        </blockquote>
      </div>

      {/* Dot navigation */}
      <div
        style={{
          margin: "10px 0 0",
          display: "flex",
          justifyContent: "center",
          gap: 10,
        }}
      >
        {testimonials.map((_, idx) => (
          <span
            key={idx}
            onClick={() => setCurrent(idx)}
            style={{
              display: "inline-block",
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: current === idx ? "#222" : "#ccc",
              cursor: "pointer",
              margin: "0 2px",
            }}
          />
        ))}
      </div>

      {/* Optional: Prev/Next buttons, hidden on mobile if desired */}
      <div style={{ marginTop: 14 }}>
        <button
          onClick={prev}
          style={{
            background: "none",
            border: "none",
            color: "#4660a0",
            fontSize: 24,
            marginRight: 10,
            cursor: "pointer",
          }}
          aria-label="Previous"
        >
          ‹
        </button>
        <button
          onClick={next}
          style={{
            background: "none",
            border: "none",
            color: "#4660a0",
            fontSize: 24,
            marginLeft: 10,
            cursor: "pointer",
          }}
          aria-label="Next"
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
