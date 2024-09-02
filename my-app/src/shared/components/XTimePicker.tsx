import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useDispatch } from "react-redux";
import { setAlarm } from "../../store/features/alarmSlice";
import { uid } from "uid";

const XTimePicker = () => {
  const dispatch = useDispatch();
  const handleAccept = (newValue: any) => {
    const formattedTime = newValue?.format("HH:mm");
    console.log("Seçilen Zaman:", formattedTime);
    dispatch(setAlarm({ time: formattedTime, isActive: true, id: uid() }));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["TimePicker", "TimePicker", "TimePicker"]}>
        <DemoItem label={'"hours", "minutes" ve "seconds"'}>
          <TimePicker
            onAccept={handleAccept} // OK butonuna tıklandığında çalışır
            views={["hours", "minutes"]}
            ampm={false}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default XTimePicker;
