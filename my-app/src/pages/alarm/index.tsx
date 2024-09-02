import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { MdBed } from "react-icons/md";
import SwitchButton from "../../shared/components/XSwitch";
import PlusIcon from "../../shared/icons/PlusIcon";
import { useEffect, useState } from "react";
import { AnchorTemporaryDrawer } from "../../shared/components/XDrawer";
import { useSelector } from "react-redux";
import { getAlarmHistory } from "../../store";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const AlarmClock = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const alarms = useSelector(getAlarmHistory);

  const openDrawer = () => {
    setDrawerVisible((prev) => !prev);
  };

  const playSound = () => {
    if (!audio) {
      const sound = new Audio("/sounds/alarm.mp3");
      sound.loop = true;
      sound.play();
      setAudio(sound);
    }
  };

  const handleAlertClose = () => {
    setOpenSnackbar(false);
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setAudio(null);
    }
  };

  const updatePastAlarms = (alarms: any[]) => {
    return alarms.map((alarm: any) => {
      console.log("updatePastAlarms alarm", alarm);

      const now = new Date();
      console.log("now",now);
      
      const [hours, minutes] = alarm.time.split(":").map(Number);
      const alarmTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        hours,
        minutes
      );

      if (alarmTime < now) {
        alarmTime.setDate(alarmTime.getDate() + 1);
      }

      const time = alarmTime.toTimeString().slice(0, 5); //time formater
      return { ...alarm, time };
    });
  };

  useEffect(() => {
    const updatedAlarms = updatePastAlarms(alarms);

    updatedAlarms.forEach((alarm: any) => {
      if (alarm.isActive) {
        const now = new Date();
        const [hours, minutes] = alarm.time.split(":").map(Number);
        const alarmTime = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          hours,
          minutes
        );

        const timeDiff = alarmTime.getTime() - now.getTime();
        if (timeDiff > 0) {
          setTimeout(() => {
            setAlertMessage(`Alarm: ${alarm.time}`);
            setOpenSnackbar(true);
            playSound();
          }, timeDiff);
        }
      }
    });
  }, [alarms]);

  return (
    <Box
      sx={{
        padding: "50px 100px",
        backgroundColor: "#000",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: "#FF9500" }}
          >
            Alarmlar
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <MdBed
              style={{
                fontWeight: "bold",
                fontSize: "25px",
                marginRight: "5px",
              }}
            />
            <Typography style={{ fontWeight: "bold", fontSize: "25px" }}>
              Uyku Zamani
            </Typography>
          </Box>
        </Box>
        <PlusIcon onClick={openDrawer} />
      </Box>
      <Box
        sx={{
          overflowY: "auto",
          maxHeight: "calc(100vh - 150px)",
          width: "100%",
        }}
      >
        {alarms.map((alarm: any, index: any) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 0",
              borderBottom: "1px solid #333",
            }}
          >
            <Box>
              <Typography
                variant="h4"
                sx={{ fontWeight: "bold", fontSize: "30px" }}
              >
                {alarm.time}
              </Typography>
              <Typography variant="subtitle1" sx={{ color: "#8E8E93" }}>
                {alarm.note}
              </Typography>
            </Box>
            <SwitchButton isActive={alarm.isActive} alarmId={alarm.id} />
          </Box>
        ))}
      </Box>

      <AnchorTemporaryDrawer visible={drawerVisible} />

      <Snackbar
        open={openSnackbar}
        autoHideDuration={null}
        onClose={handleAlertClose}
      >
        <Alert
          onClose={handleAlertClose}
          severity="warning"
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AlarmClock;
