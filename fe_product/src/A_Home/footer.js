import React, { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import Chatbox from "../Chatbox";
import chatIcon from "../images/chat-icon.png";
const Footer = () => {
  const [boxContent, setBoxContent] = useState("");
  const [showChat, setShowChat] = useState(false);
  const FixedBox = ({ content, onClose }) => (
    <div className="fixed-box-overlay">
      <div className="fixed-box">
        <div className="box-content">
          <button className="close-btn" onClick={onClose}>
            ✖
          </button>
          <p>{content}</p>
        </div>
      </div>
    </div>
  );

  return (
    <Box
      sx={{
        mt: 4,
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {boxContent && (
        <FixedBox content={boxContent} onClose={() => setBoxContent("")} />
      )}
      {showChat && <Chatbox />}

      <button className="chat-toggle" onClick={() => setShowChat(!showChat)}>
        <img src={chatIcon} alt="Chat" />
      </button>

      <Box
        sx={{
          width: "100vw", // Đảm bảo full màn hình
          bgcolor: "#8B5A2B",
          py: 2,
          textAlign: "center",
          color: "#5D4037",
          fontWeight: "bold",
        }}
      >
        <Typography variant="body2" style={{ color: "white" }}>
          © 2025 Gom Xinh Potter - All rights reserved
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
