import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { IoIosTimer } from "react-icons/io";
import { TfiWorld } from "react-icons/tfi";
import { IoIosAlarm } from "react-icons/io";
import { RxLapTimer } from "react-icons/rx";

export default function Footer() {
  const [value, setValue] = React.useState("Dünya saati");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      sx={{
        width: "100%",
        position: "fixed",
        padding: "20px",
        bottom: 0,
        backgroundColor:"black"
      }}
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction
        label="Dünya saati"
        value="Dünya saati"
        icon={<TfiWorld />}
        sx={{
          color: value === "Dünya saati" ? "#FF9500" : "#fff",
          fontSize: "250px",
          "&.Mui-selected": {
            color: "#FF9500",
          },
        }}
      />
      <BottomNavigationAction
        label="Alarmlar"
        value="Alarmlar"
        icon={<IoIosAlarm />}
        sx={{
          color: value === "Alarmlar" ? "#FF9500" : "#fff",
          fontSize: "250px",
          "&.Mui-selected": {
            color: "#FF9500",
          },
        }}
      />
      <BottomNavigationAction
        label="Kronometre"
        value="Kronometre"
        icon={<RxLapTimer />}
        sx={{
          color: value === "Kronometre" ? "#FF9500" : "#fff",
          fontSize: "250px",
          "&.Mui-selected": {
            color: "#FF9500",
          },
        }}
      />
      <BottomNavigationAction
        label="Sayaçlar"
        value="Sayaçlar"
        icon={<IoIosTimer />}
        sx={{
          color: value === "Sayaçlar" ? "#FF9500" : "#fff",
          fontSize: "250px",
          "&.Mui-selected": {
            color: "#FF9500",
          },
        }}
      />
    </BottomNavigation>
  );
}
