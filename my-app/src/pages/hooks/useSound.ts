import { useState } from "react";
import { useDispatch } from "react-redux";
import { setIsRunning, setTime } from "../../store/features/timerSlice";
import { useSelector } from "react-redux";
import { getPrevTimesSelector } from "../../store";

interface IUseSoundReturn {
  audio: HTMLAudioElement | null;
  setAudio?: React.Dispatch<React.SetStateAction<HTMLAudioElement | null>>;
  playSound?: (soundUrl?: string) => void;
  stopSound?: (soundUrl?: string) => void;
  reStartTimer?: () => void;
}

type IUseSound = () => IUseSoundReturn;
export const useSound: IUseSound = () => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const dispatch = useDispatch();

  const timeList = useSelector(getPrevTimesSelector);

  const playSound = (soundUrl: string = "/sounds/timerSound.mp3") => {
    if (!audio) {
      const sound = new Audio(soundUrl);
      sound.loop = true;
      sound.play();
      setAudio(sound);
    }
  };
  const stopSound = (soundUrl: string = "/sounds/timerSound.mp3") => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setAudio(null);
    }
  };

  const reStartTimer = () => {
    const findTimer = timeList?.find((time) => time.currentTime);
    console.log("FIND",findTimer);
    
    if (findTimer) {
      dispatch(setTime({ ...findTimer, currentTime: false }));
      dispatch(setIsRunning(true));
    }

    stopSound();
  };

  return { audio, setAudio, playSound, stopSound, reStartTimer };
};
