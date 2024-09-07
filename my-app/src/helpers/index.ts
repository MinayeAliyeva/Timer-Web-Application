import { IAlarm } from "../pages/alarm/modules";

export const getAlarmTimeDetails = (time: string, date: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    const [year, month, day] = date.split("-").map(Number);
    return new Date(year, month - 1, day, hours, minutes);
  };

  export const closeAlarm = (
    audio: HTMLAudioElement | null,
    setAudio: (audio: HTMLAudioElement | null) => void
  ) => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setAudio(null);
    }
  };

  export const updatePastAlarms = (alarms: IAlarm[]) => {
    return alarms.map((alarm: IAlarm) => {
      const now = new Date();
      const alarmTime = getAlarmTimeDetails(alarm.time, alarm.date);
      if (alarmTime < now) {
        alarmTime.setDate(alarmTime.getDate() + 1);
      }
      const time = alarmTime.toTimeString().slice(0, 5);
      return { ...alarm, time };
    });
  };



export const formatTime = (num: number) => (num < 10 ? `0${num}` : num);

export const playSound = (audio: HTMLAudioElement | null, setAudio: (audio: HTMLAudioElement | null) => void, soundUrl: string) => {
  if (!audio) {
    const sound = new Audio(soundUrl);
    sound.loop = true;
    sound.play();
    setAudio(sound);
  }
};

export const resetAudio = (audio: HTMLAudioElement | null, setAudio: (audio: HTMLAudioElement | null) => void) => {
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
    setAudio(null);
  }
};
