import React from "react";
import { Button, Box, Typography, Paper, Grid, Avatar } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import config from "../config";
function Login() {
  const handleGoogleLogin = (e) => {
    e.preventDefault();
    window.location.href = `${config.API_BASE_URL}/Auth/login-google`;
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#fdfaf6", // nền tone nâu nhạt
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 5,
          width: "100%",
          maxWidth: 420,
          textAlign: "center",
          borderRadius: 3,
          backgroundColor: "#fffaf0", // giấy tone kem nhạt
        }}
      >
        <Avatar
          sx={{
            width: 80,
            height: 80,
            margin: "0 auto 20px",
            backgroundColor: "#a67c52", // nâu nhạt
          }}
        >
          <LoginIcon fontSize="large" sx={{ color: "#fffaf0" }} />
        </Avatar>

        <Typography
          variant="h5"
          gutterBottom
          sx={{
            color: "#5e412f",
            fontWeight: "bold",
          }}
        >
          Đăng nhập vào DecorHome
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#8b6f47",
            marginBottom: 3,
          }}
        >
          Khám phá thế giới trang trí phong cách của bạn.
        </Typography>

        <Grid container spacing={2} direction="column" alignItems="center">
          <Grid item sx={{ width: "100%" }}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleGoogleLogin}
              sx={{
                padding: "12px 20px",
                fontWeight: 600,
                backgroundColor: "#d2691e", // cam nâu
                color: "#fffaf0",
                fontSize: "15px",
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: "#b35900",
                },
              }}
            >
              Đăng nhập với Google
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default Login;
