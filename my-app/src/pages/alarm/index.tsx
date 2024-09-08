import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { MdBed, MdDelete } from "react-icons/md";
import PlusIcon from "../../shared/icons/PlusIcon";
import { memo, useCallback, useEffect, useState } from "react";
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
import XNotification from "../../shared/components/XNotification";
import { closeAlarm, getAlarmTimeDetails } from "../../helpers";
import { AlarmButtonStyle, AlarmMainBoxStyle } from "../../constands/style";

const AlarmClock = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [openNotification, setOpenNotification] = useState(false);
  const [activeAlarm, setActiveAlarm] = useState<IAlarm | null>(null);
  const alarms = useSelector(getAlarmHistory);
  const dispatch = useDispatch();

  const selectedSounds = useSelector(getAlarmHistory).map((alarm) => ({
    id: alarm.id,
    sound: alarm.sound, // sounds/alarm1.mp3
  }));

  const openDrawer = useCallback(() => {
    setDrawerVisible((prev) => !prev);
  }, []);

  const playSound = useCallback(
    (soundUrl: string) => {
      if (!audio) {
        const sound = new Audio(soundUrl);
        sound.loop = true;
        sound.play();
        setAudio(sound);
      }
    },
    [audio]
  );

  const handleModalClose = () => {
    setOpenModal(false);
    closeAlarm(audio, setAudio);
    if (alertMessage) {
      const findTime = alertMessage.split(":").slice(1, 3).join(":");
      const alarmToUpdate = alarms.find(
        (alarm) => alarm.time.trim() === findTime.trim()
      );
      if (alarmToUpdate) {
        dispatch(
          updateAlarmTime({
            id: alarmToUpdate.id,
            isActive: false,
            newTime: alarmToUpdate.time,
          })
        );
      }
    }
  };

  useEffect(() => {
    const timeouts = alarms.map((alarm: IAlarm) => {
      if (alarm.isActive) {
        const now = new Date();
        const alarmTime = getAlarmTimeDetails(alarm.time, alarm.date);
        const timeDiff = alarmTime.getTime() - now.getTime();
        setActiveAlarm(alarm);
        if (!alarm.isPastTime) {
          console.log("future alarms", alarm);
          return setTimeout(() => {
            const selectedSound = selectedSounds.find(
              (sound) => sound.id === alarm.id
            );
            setAlertMessage(`Alarm: ${alarm.time}`);
            setOpenModal(true);
            playSound(selectedSound?.sound || "/sounds/defaultAlarm.mp3");
          }, timeDiff);
        } else {
          console.log("past alarm", alarm);
          setOpenNotification(true);
          alarmTime.setDate(alarmTime.getDate() + 1);
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
    setOpenModal(false);
    closeAlarm(audio, setAudio);
    if (alertMessage) {
      const findTime = alertMessage.split(":").slice(1, 3).join(":");
      const alarmToUpdate = alarms.find(
        (alarm) => alarm.time.trim() === findTime.trim()
      );
      if (alarmToUpdate) {
        const alarmTime = getAlarmTimeDetails(
          alarmToUpdate.time,
          alarmToUpdate.date
        );
        alarmTime.setMinutes(alarmTime.getMinutes() + 2);
        const newTime = alarmTime.toTimeString().slice(0, 5);
        dispatch(
          updateAlarmTime({ id: alarmToUpdate.id, newTime, isActive: true })
        );
      }
    }
  };
  const onCancel = () => {
    if (activeAlarm) {
      dispatch(
        updateAlarmTime({
          id: activeAlarm.id,
          isActive: false,
          newTime: activeAlarm.time, 
        })
      );
      setOpenNotification(false); 
      setActiveAlarm(null); 
    }
  };
  

  return (
    <Box
      sx={AlarmMainBoxStyle}
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
                color: "#fff",
              }}
            />
            <Typography
              style={{ fontWeight: "bold", fontSize: "25px", color: "#fff" }}
            >
              Uyku Zamani
            </Typography>
          </Box>
        </Box>
        <Button
          onClick={() => clearAllAlarms()}
          variant="contained"
          color="warning"
          sx={AlarmButtonStyle}
          startIcon={<MdDelete />}
        >
          CLEAR ALL ALARMS
        </Button>
        <PlusIcon onClick={openDrawer} />
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
      <Box
        sx={{
          overflowY: "auto",
          maxHeight: "calc(100vh - 150px)",
          width: "100%",
        }}
      >
        <AnchorTemporaryDrawer visible={drawerVisible} />
      </Box>
      <AlarmModal
        open={openModal}
        message={alertMessage}
        onClose={handleModalClose}
        doLater={doLater}
      />
      <XNotification open={openNotification} onCancel={onCancel} />
    </Box>
  );
};

export default memo(AlarmClock);
