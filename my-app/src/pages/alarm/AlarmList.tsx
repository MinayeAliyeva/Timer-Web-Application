import { Box, Typography } from "@mui/material";
import { MdDelete } from "react-icons/md";
import SwitchButton from "../../shared/components/XSwitch";
import { FC, memo } from "react";
interface IPropsAlarmList {
  index: number;
  alarm: {
    id: string;
    time: string;
    note: string;
    isActive: boolean;
  };
  deleteTime: (alarmId: string) => void;
  alarmId?: string;
}
const AlarmList: FC<IPropsAlarmList> = ({ index, alarm, deleteTime }) => {
  return (
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
        <Typography variant="h4" sx={{ fontWeight: "bold", fontSize: "30px" }}>
          {alarm.time}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "#8E8E93" }}>
          {alarm.note}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <SwitchButton isActive={alarm.isActive} alarmId={alarm.id} />
        <MdDelete
          onClick={() => deleteTime(alarm.id)}
          style={{ fontSize: "25px" }}
        />
      </Box>
    </Box>
  );
};

export default memo(AlarmList);
