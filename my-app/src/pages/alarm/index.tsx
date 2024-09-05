import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { MdBed, MdDelete } from "react-icons/md";
import PlusIcon from "../../shared/icons/PlusIcon";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnchorTemporaryDrawer } from "../../shared/components/XDrawer";
import { useSelector, useDispatch } from "react-redux";
import { getAlarmHistory } from "../../store";
import {
  clearAllAlarmHistory,
  deleteAlarm,
  updateAlarmTime,
} from "../../store/features/alarmSlice";
import AlarmList from "./AlarmList";
import { IAlarm } from "./modules";
import AlarmModal from "./AlarmModal";

const AlarmClock = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const alarms = useSelector(getAlarmHistory);
  const selectedSounds = useSelector(getAlarmHistory).map((alarm) => ({
    id: alarm.id,
    sound: alarm.sound, // /sounds/alarm1.mp3
  }));
  const ref = useRef();
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

  const handleModalClose = () => {
    setOpenModal(false);
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
            setOpenModal(true);
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

  const doLater = () => {
    if (alertMessage) {
      const findTime = alertMessage.split(":").slice(1, 3).join(":");
      const alarmToUpdate = alarms.find((alarm) => {
        return alarm.time.trim() === findTime.trim();
      });
      if (alarmToUpdate) {
        const now = new Date();
        const [hours, minutes] = alarmToUpdate.time.split(":").map(Number);
        const alarmTime = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          hours,
          minutes
        );
        alarmTime.setMinutes(alarmTime.getMinutes() + 9);
        const newTime = alarmTime.toTimeString().slice(0, 5);
        dispatch(updateAlarmTime({ id: alarmToUpdate.id, newTime }));
      } else {
        console.log("Alarm bulunamadı.");
      }
    }
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
          <AlarmList
            key={index}
            deleteTime={deleteTime}
            alarm={alarm}
            index={index}
          />
        ))}
      </Box>

      <AnchorTemporaryDrawer visible={drawerVisible} />

      <AlarmModal
        open={openModal}
        message={alertMessage}
        onClose={handleModalClose}
        doLater={doLater}
      />
    </Box>
  );
};

export default AlarmClock;
