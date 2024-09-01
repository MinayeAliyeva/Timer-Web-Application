import { Box, ListItem, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const DefaultClock = () => {
  const [time, setTime] = useState("");
  useEffect(() => {
    let hour: any = String(new Date().getHours()).padStart(2, "0");
    let min: any = String(new Date().getMinutes()).padStart(2, "0");
    let sec: any = String(new Date().getSeconds()).padStart(2, "0");
    const interval = setInterval(() => {
      sec++;
      if (sec >= 60) {
        min++;
        sec = 0;
      }
      if (min >= 60) {
        hour++;
        min = 0;
      }
      if (min === 24) {
        min = 0;
        sec = 0;
        hour = 0;
      }
      setTime(`${hour}:${min}:${sec}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
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
        </Box>
        <Box sx={{ textAlign: "right" }}>
          <Typography sx={{ fontWeight: "bold", fontSize: 22,color:'white' }}>
            {time}
          </Typography>
        </Box>
      </Box>
    </ListItem>
  );
};

export default DefaultClock;
