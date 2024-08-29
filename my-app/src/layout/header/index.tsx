import * as React from "react";
import Box from "@mui/material/Box";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import { HiPlus } from "react-icons/hi";

export default function Header() {
  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",

          textAlign: "center",
          justifyContent: "space-around",
        }}
      >
        <Typography sx={{ minWidth: 100 }}>Duzenle</Typography>

        <IconButton>
          {" "}
          <HiPlus />
        </IconButton>
      </Box>
    </React.Fragment>
  );
}
