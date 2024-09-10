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
import XNotification from "../../shared/components/XNotification";
import { AlarmButtonStyle, AlarmMainBoxStyle } from "../../constands/style";
import { getAlarmTimeDetails } from "../../helpers";

const AlarmClock = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [activeAlarm, setActiveAlarm] = useState<IAlarm | null>(null);
  const alarms = useSelector(getAlarmHistory);
  const dispatch = useDispatch();

  const openDrawer = useCallback(() => {
    setDrawerVisible(true);
  }, []);

  const deleteTime = useCallback(
    (alarmId: string) => {
      dispatch(deleteAlarm(alarmId));
    },
    [dispatch]
  );

  const clearAllAlarms = () => {
    dispatch(clearAllAlarmHistory());
  };

  const onCancel = () => {
    console.log("activeAlarm", activeAlarm);
    dispatch(deleteAlarm(alarms[alarms.length - 1].id));
    setOpenNotification(false);
  };
  const onConfirm = () => {
    setOpenNotification(false);
  };

  useEffect(() => {
    if (!drawerVisible && alarms.length) {
      // console.log("open xnotfication");
      // console.log("alarm sonuncu", alarms[alarms.length - 1]);
      const now = new Date();
      const currentlyALarmTime = getAlarmTimeDetails(
        alarms[alarms.length - 1]?.time,
        alarms[alarms.length - 1]?.date
      );
      const timeDiff = currentlyALarmTime.getTime() - now.getTime();
      if (timeDiff < 0 && alarms[alarms.length - 1]?.isActive) {
        setOpenNotification(true);
      }
    }
  }, [drawerVisible]);

  const closeDrawer = () => {
    setDrawerVisible(false);
  };
  console.log("drawerVisible", drawerVisible);
  return (
    <Box sx={AlarmMainBoxStyle}>
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
        <AnchorTemporaryDrawer
          closeDrawer={closeDrawer}
          visible={drawerVisible}
        />
      </Box>

      <XNotification
        onConfirm={onConfirm}
        open={openNotification}
        onCancel={onCancel}
      />
    </Box>
  );
};

export default memo(AlarmClock);
