import {  IconButton, Typography } from "@mui/material";
import AlarmIcon from "@mui/icons-material/Alarm";
import { memo } from "react";

const AddButton = ({handleStart}:any) => {
  return (
    <IconButton onClick={handleStart} color="info" aria-label="add an alarm">
      <AlarmIcon />
      <Typography style={{ color: "#fff" }}>Start</Typography>
    </IconButton>
  );
};

export default memo(AddButton);
