import { useSelector } from "react-redux";
import { getAlarmHistory } from "../../store";
import { useCallback, useEffect, useState } from "react";
import { IAlarm } from "../alarm/modules";
import { closeAlarm, getAlarmTimeDetails } from "../../helpers";
import {  updateAlarmTime } from "../../store/features/alarmSlice";
import { useDispatch } from "react-redux";
export const useAlarmInterval = () => {
  const [activeAlarm, setActiveAlarm] = useState<IAlarm | null>(null);
  const [openAlarmModal, setOpenAlarmModal] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  // const [openModal, setOpenModal] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [openNotification, setOpenNotification] = useState(false);
  const alarms = useSelector(getAlarmHistory);
  const dispatch = useDispatch();
  const selectedSounds = useSelector(getAlarmHistory).map((alarm) => ({
    id: alarm.id,
    sound: alarm.sound, // sounds/alarm1.mp3
  }));
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
  useEffect(() => {
    const now = new Date();
    const timeouts = alarms.map((alarm: IAlarm) => {
      if (alarm.isActive) {
        const alarmTime = getAlarmTimeDetails(alarm.time, alarm.date);
        const timeDiff = alarmTime.getTime() - now.getTime();
        // setActiveAlarm(alarm);
        if (!alarm.isPastTime) {
          return setTimeout(() => {
           setOpenAlarmModal(true);
            const selectedSound = selectedSounds.find(
              (sound) => sound.id === alarm.id
            );
            setAlertMessage(`Alarm: ${alarm.time}`);
            // setOpenModal(true);
            playSound(selectedSound?.sound || "/sounds/defaultAlarm.mp3");
          }, timeDiff);
        } else {
          // setOpenNotification(true);
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
  }, [alarms]);

  const handleModalClose = () => {
    setOpenAlarmModal(false);
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
  const doLater = () => {
    setOpenAlarmModal(false);
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
      setOpenAlarmModal(false);
      setActiveAlarm(null);
    }
    // setOpenNotification(false);
  };

  // const onConfirm = () => {
  //   setOpenNotification(false);
  // };
  return {openAlarmModal, alertMessage, onCancel, handleModalClose, doLater}
};
