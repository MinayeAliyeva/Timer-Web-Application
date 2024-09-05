import Box from "@mui/material/Box";

export default function Header() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around", 
        padding: "10px 20px", 
        backgroundColor: "#000",
      }}
    ></Box>
  );
}
