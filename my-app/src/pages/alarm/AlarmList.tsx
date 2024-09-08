import { Box, Typography } from "@mui/material";
import { MdDelete } from "react-icons/md";
import SwitchButton from "../../shared/components/XSwitch";
import { FC, memo } from "react";
import { AlarmBoxStyle, AlarmMdDeleteStyle } from "../../constands/style";

interface IPropsAlarmList {
  index: number;
  alarm: {
    id: string;
    time: string;
    note: string;
    isActive: boolean;
    date: string;
  };
  deleteTime: (alarmId: string) => void;
  alarmId?: string;
}

const AlarmList: FC<IPropsAlarmList> = ({ index, alarm, deleteTime }) => {
  return (
    <Box key={index} sx={AlarmBoxStyle}>
      <Box>
        <Typography variant="body2" sx={{ color: "#555", mb: 0.5 }}>
          {alarm.date} tarihi, saat {alarm.time} kuruldu
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#333" }}>
          {alarm.time}
        </Typography>
        <Typography variant="subtitle2" sx={{ color: "#888", mt: 0.5 }}>
          {alarm.note && `Note: ${alarm.note}`}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <SwitchButton isActive={alarm.isActive} alarmId={alarm.id} />
        <MdDelete
          onClick={() => deleteTime(alarm.id)}
          style={AlarmMdDeleteStyle}
        />
      </Box>
    </Box>
  );
};

export default memo(AlarmList);
