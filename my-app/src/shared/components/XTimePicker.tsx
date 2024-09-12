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
import { getAlarmTimeDetails } from "../../helpers";

const formatTime = (date: Date) => {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

const formatDate = (date: Date) => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Aylar 0'dan başlar
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

const soundOptions = ["alarm1.mp3", "alarm2.mp3", "alarm3.mp3", "alarm4.mp3"];

const XTimePicker = ({
  onCloseDrawer,
}: {
  onCloseDrawer: (arg: boolean) => void;
}) => {
  const dispatch = useDispatch();
  const [time, setTime] = useState<Date>(new Date());
  const [note, setNote] = useState<string>("");
  const [sound, setSound] = useState<string>("");

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = e.target.value.split(":").map(Number);
    const updatedTime = new Date(time);
    updatedTime.setHours(hours);
    updatedTime.setMinutes(minutes);
    setTime(updatedTime);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [year, month, day] = e.target.value.split("-").map(Number);
    const updatedDate = new Date(time);
    updatedDate.setFullYear(year);
    updatedDate.setMonth(month - 1); //aylar sifirdan baslayir deye 1 cixdim
    updatedDate.setDate(day);
    setTime(updatedDate);
  };

  const handleSoundChange = (e: SelectChangeEvent<string>) => {
    setSound(e.target.value as string);
  };

  const handleAccept = () => {
    const formattedTime = formatTime(time);
    const formattedDate = formatDate(time);

    const dateParts = formattedDate.split("-");
    if (
      dateParts[2]?.length === 2 &&
      dateParts[1]?.length === 2 &&
      dateParts[0]?.length === 4
    ) {
      const now = new Date();
      const alarmTime = getAlarmTimeDetails(formattedTime, formattedDate);
      const timeDiff = alarmTime.getTime() - now.getTime();

      dispatch(
        setAlarm({
          date: formattedDate,
          time: formattedTime,
          note: note,
          isActive: true,
          sound: sound ? `/sounds/${sound}` : "/sounds/alarm1.mp3",
          id: uid(),
          isPastTime: timeDiff < 0,
        })
      );
      setNote("");
      setTime(new Date());
      setSound("");
      onCloseDrawer(false);
    } else {
      return;
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <TextField
        label="Tarih"
        variant="outlined"
        type="date"
        value={formatDate(time)}
        onChange={handleDateChange}
      />
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
