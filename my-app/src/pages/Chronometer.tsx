import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

const Chronometer = () => {
  return (
    <Box
      sx={{
        padding: "20px",
        backgroundColor: "#000",
        color: "#fff",
        minHeight: "100vh",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: "20px", color: "#FF9500" }}>
        Kronometre
      </Typography>
      <Typography
        variant="h1"
        sx={{
          marginBottom: "20px",
          fontSize: "80px",
          color: "#fff",
        }}
      >
        00:00:00
      </Typography>
      <Box
        sx={{ display: "flex", justifyContent: "space-around",gap:'70px'  }}
      >
        <Button
          sx={{ borderRadius: "50%", width: "100px", height: "100px",margin:'0 10px' }}
          variant="contained"
        >
          Sifirla
        </Button>
        <Button
          sx={{ borderRadius: "50%", width: "100px", height: "100px" }}
          variant="contained"
        >
          Baslat
        </Button>
      </Box>
    </Box>
  );
};

export default Chronometer;
