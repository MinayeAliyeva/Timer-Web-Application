import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: "20px",
          color: "#fff", // Beyaz renk
        }}
      >
        Saatler
      </Typography>
   
    </Box>
  );
}
