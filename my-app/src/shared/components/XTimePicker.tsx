import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAlarm } from "../../store/features/alarmSlice";
import { uid } from "uid";
import { TextField, Box, Button } from "@mui/material";

const formatTime = (date: Date) => {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

const XTimePicker = () => {
  const dispatch = useDispatch();
  const [time, setTime] = useState<Date>(new Date());
  const [note, setNote] = useState<string>("");

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = e.target.value.split(":").map(Number);
    const now = new Date();
    now.setHours(hours);
    now.setMinutes(minutes);
    setTime(now);
  };

  const handleAccept = () => {
    const formattedTime = formatTime(time);
    dispatch(
      setAlarm({
        time: formattedTime,
        note: note, 
        isActive: true,
        id: uid(),
      })
    );
    setNote("");
    setTime(new Date());
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <TextField
        label="Saat"
        variant="outlined"
        type="time"
        value={formatTime(time)}
        onChange={handleTimeChange}
      />
      <TextField
        label="Not"
        variant="outlined"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleAccept}>
        Alarmı Ayarla
      </Button>
    </Box>
  );
};

export default XTimePicker;
