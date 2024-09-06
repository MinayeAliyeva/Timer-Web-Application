import { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { setAlarm } from "../../store/features/alarmSlice";
import { uid } from "uid";
import {
  TextField,
  Box,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

const formatTime = (date: Date) => {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

const soundOptions = ["alarm1.mp3", "alarm2.mp3", "alarm3.mp3","alarm4.mp3"];

const XTimePicker = () => {
  const dispatch = useDispatch();
  const [time, setTime] = useState<Date>(new Date());
  const [note, setNote] = useState<string>("");
  const [sound, setSound] = useState<string>("");

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = e.target.value.split(":").map(Number);
    const now = new Date();
    now.setHours(hours);
    now.setMinutes(minutes);
    setTime(now);
  };

  const handleSoundChange = (e: SelectChangeEvent<string>) => {
    setSound(e.target.value as string);
  };

  const handleAccept = () => {
    const formattedTime = formatTime(time);
    dispatch(
      setAlarm({
        time: formattedTime,
        note: note,
        isActive: true,
        sound: sound ? `/sounds/${sound}` : "/sounds/alarm1.mp3",
        id: uid(),
      })
    );
    setNote("");
    setTime(new Date());
    setSound("");
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
      <Select
        value={sound}
        onChange={handleSoundChange}
        displayEmpty
        variant="outlined"
      >
        <MenuItem value="" disabled>
          Ses seçin
        </MenuItem>
        {soundOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      <Button variant="contained" color="primary" onClick={handleAccept}>
        Alarmı Ayarla
      </Button>
    </Box>
  );
};

export default memo(XTimePicker);
