import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../config";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${config.API_BASE_URL}/Users/forgot-password`,
        { email }
      );

      setTimeout(() => {
        if (response.data.flag === false) {
          toast.success(response.data.message, { position: "top-left" });
        } else {
          toast.error(response.data.message, { position: "top-left" });
        }
        setIsSubmitting(false);
        setTimeout(() => navigate("/"), 2000);
      }, 5000);
    } catch (error) {
      setTimeout(() => {
        toast.error("Có lỗi trong quá trình gửi email", {
          position: "top-left",
        });
        setIsSubmitting(false);
      }, 5000);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{ mt: 8, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "white" }}
      >
        <Typography variant="h5" gutterBottom textAlign="center">
          🔑 Forgot Password
        </Typography>
        <Typography variant="body2" color="textSecondary" textAlign="center">
          Enter your email, and we'll send you a new password.
        </Typography>

        <form onSubmit={handleForgotPassword}>
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Send Reset Email"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
