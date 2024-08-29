import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { HiPlus } from "react-icons/hi";

export default function Header() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around", // Butonları uçlara koyar
        padding: "10px 20px", // İç kenar boşluğu ekler
        backgroundColor: "#000", // Arka plan siyah
      }}
    >
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: "20px",
          color: "#FF9500", // Turuncu renk
        }}
      >
        Düzenle
      </Typography>

      <IconButton>
        <HiPlus style={{ color: "#FF9500", fontSize: "30px" }} />
      </IconButton>
    </Box>
  );
}
