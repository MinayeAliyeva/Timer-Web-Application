import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function TimeList() {
  return (
    <List sx={{ width: "100%", bgcolor: "#000", color: "#fff" }}>
      <ListItem alignItems="flex-start" sx={{ paddingY: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box>
            <Typography
              sx={{ fontWeight: "bold", fontSize: 18, color: "#FF9500" }}
            >
              Baku
            </Typography>
            <Typography sx={{ color: "#A9A9A9" }}>GMT+4</Typography>
          </Box>
          <Box sx={{ textAlign: "right" }}>
            <Typography sx={{ fontWeight: "bold", fontSize: 22 }}>
              12:45
            </Typography>
            <Typography sx={{ color: "#A9A9A9" }}>Gece</Typography>
          </Box>
        </Box>
      </ListItem>
      <Divider component="li" sx={{ bgcolor: "#333" }} />

      <ListItem alignItems="flex-start" sx={{ paddingY: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box>
            <Typography
              sx={{ fontWeight: "bold", fontSize: 18, color: "#FF9500" }}
            >
              New York
            </Typography>
            <Typography sx={{ color: "#A9A9A9" }}>GMT-4</Typography>
          </Box>
          <Box sx={{ textAlign: "right" }}>
            <Typography sx={{ fontWeight: "bold", fontSize: 22 }}>
              08:45
            </Typography>
            <Typography sx={{ color: "#A9A9A9" }}>Gündüz</Typography>
          </Box>
        </Box>
      </ListItem>
      <Divider component="li" sx={{ bgcolor: "#333" }} />
    </List>
  );
}
