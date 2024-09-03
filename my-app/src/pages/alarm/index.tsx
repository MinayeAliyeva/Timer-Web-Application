import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { MdBed } from "react-icons/md";
import PlusIcon from "../../shared/icons/PlusIcon";
import { useCallback, useEffect, useState } from "react";
import { AnchorTemporaryDrawer } from "../../shared/components/XDrawer";
import { useSelector } from "react-redux";
import { getAlarmHistory } from "../../store";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  clearAllAlarmHistory,
  deleteAlarm,
} from "../../store/features/alarmSlice";
import AlarmSnackBar from "./AlarmSnackBar";
import AlarmList from "./AlarmList";
import { IAlarm } from "./modules";

const AlarmClock = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const alarms = useSelector(getAlarmHistory);
  const selectedSounds = useSelector(getAlarmHistory).map((alarm) => ({
    id: alarm.id,
    sound: alarm.sound,
  }));

  const dispatch = useDispatch();
  const openDrawer = () => {
    setDrawerVisible((prev) => !prev);
  };

  const playSound = (soundUrl: string) => {
    if (!audio) {
      const sound = new Audio(soundUrl);
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

  const updatePastAlarms = (alarms: IAlarm[]) => {
    return alarms.map((alarm: IAlarm) => {
      const now = new Date();
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
      const time = alarmTime.toTimeString().slice(0, 5);
      return { ...alarm, time };
    });
  };

  useEffect(() => {
    const updatedAlarms = updatePastAlarms(alarms);
    const timeouts = updatedAlarms.map((alarm: any) => {
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
          return setTimeout(() => {
            const selectedSound = selectedSounds.find(
              (sound) => sound.id === alarm.id
            );
            setAlertMessage(`Alarm: ${alarm.time}`);
            setOpenSnackbar(true);
            playSound(selectedSound?.sound || "/sounds/defaultAlarm.mp3");
          }, timeDiff);
        }
      }
      return null;
    });

    return () => {
      timeouts.forEach((timeoutId) => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      });
    };
  }, [alarms, audio, selectedSounds]);

  const deleteTime = useCallback(
    (alarmId: string) => {
      dispatch(deleteAlarm(alarmId));
    },
    [dispatch]
  );

  const clearAllAlarms = () => {
    dispatch(clearAllAlarmHistory());
  };

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
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
          CLEAR ALL ALARMS
          <MdDelete
            onClick={() => clearAllAlarms()}
            style={{ fontSize: "25px" }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          overflowY: "auto",
          maxHeight: "calc(100vh - 150px)",
          width: "100%",
        }}
      >
        {alarms.map((alarm, index) => (
          <AlarmList deleteTime={deleteTime} alarm={alarm} index={index} />
        ))}
      </Box>

      <AnchorTemporaryDrawer visible={drawerVisible} />
      <AlarmSnackBar
        handleAlertClose={handleAlertClose}
        openSnackbar={openSnackbar}
        alertMessage={alertMessage}
      />
    </Box>
  );
};

export default AlarmClock;
