import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import { MdBed } from "react-icons/md";
import SwitchButton from "../../shared/components/XSwitch";
import PlusIcon from "../../shared/icons/PlusIcon";
import { useState } from "react";
import { AnchorTemporaryDrawer } from "../../shared/components/XDrawer";
const AlarmClock = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const alarms = [{ time: "07:00", label: "Uyanma", active: true }];
  const openDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };
  return (
    <Box
      sx={{
        padding: "50px 100px",
        backgroundColor: "#000",
        color: "#fff",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: "bold", color: "#FF9500" }}>
        Alarmlar
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <MdBed style={{ fontWeight: "bold", fontSize: "25px" }} /> |{" "}
          <Typography style={{ fontWeight: "bold", fontSize: "25px" }}>
            Uyku Zamani
          </Typography>
        </Box>
        <PlusIcon onClick={openDrawer} />
        <AnchorTemporaryDrawer visible={drawerVisible} />
      </Box>
      {alarms.map((alarm, index) => (
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
              {alarm.label}
            </Typography>
          </Box>
          {/* <Switch
            checked={alarm.active}
            sx={{
              "& .MuiSwitch-switchBase.Mui-checked": {
                color: "#FF9500",
              },
              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                backgroundColor: "#FF9500",
              },
            }}
          /> */}
          <SwitchButton />
        </Box>
      ))}
    </Box>
  );
};

export default AlarmClock;
