import "./App.css";
import { useMapRoutes } from "./routes";
import { useSelector } from "react-redux";
import { getTimeRunningSelector } from "./store";
import SnackBar from "./shared/components/Snackbar";
import { useDispatch } from "react-redux";
import { setIsRunning } from "./store/features/timerSlice";
import { useSound } from "./pages/hooks/useSound";
import { useEffect, useState } from "react";
import AlertModal from "../src/pages/timer/DigitalModal";
import { useSetInterval } from "./pages/hooks/useSetInterval";
const sound = "/sounds/timerSound.mp3";
function App() {
  const running = useSelector(getTimeRunningSelector);
  const { playSound, stopSound, reStartTimer } = useSound();
  const [openModal, setOpenModal] = useState(true);
  const dispatch = useDispatch();

  const myRoute = useMapRoutes();
  useSetInterval();
  useEffect(() => {
    if (running === false) {
      setOpenModal(true);
      playSound?.();
    }
  }, [running]);

  const handleClose = () => {
    dispatch(setIsRunning(null));
    setOpenModal(false);
    stopSound?.();
  };
  return (
    <>
      <div className="App">{myRoute}</div>
      {running === false && (
        <AlertModal
          open={openModal}
          handleClose={handleClose}
          reStartTimer={reStartTimer}
        />
      )}
    </>
  );
}

export default App;
