import React, { useState, useRef } from "react";

const OTPForm = () => {
  const OTP_LENGTH = 4;
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < OTP_LENGTH - 1) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("Text").slice(0, OTP_LENGTH);
    if (/^\d+$/.test(pasteData)) {
      const pasteArray = pasteData.split("");
      const newOtp = Array(OTP_LENGTH).fill("");
      pasteArray.forEach((num, idx) => {
        newOtp[idx] = num;
      });
      setOtp(newOtp);
      const nextIndex =
        pasteArray.length < OTP_LENGTH ? pasteArray.length : OTP_LENGTH - 1;
      inputsRef.current[nextIndex].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    console.log("Entered OTP:", enteredOtp);
    // Gửi OTP đến backend tại đây
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#d4edda",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
          backgroundColor: "#fff",
          padding: "32px",
          borderRadius: "16px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ display: "flex", gap: "8px" }}>
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              ref={(el) => (inputsRef.current[index] = el)}
              style={{
                width: "48px",
                height: "48px",
                textAlign: "center",
                fontSize: "24px",
                border: "2px solid #28a745",
                borderRadius: "8px",
                outline: "none",
              }}
            />
          ))}
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: "#28a745",
            color: "#fff",
            padding: "12px 24px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default OTPForm;
