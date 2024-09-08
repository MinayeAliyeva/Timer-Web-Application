import { Divider, ListItem, Typography } from "@mui/material";
import { FC, memo } from "react";
import { ITimeHistory, TypeTimeHistory } from "./modules";
import { ClonometerListItemStyle } from "../../constands/style";

interface IHistoryListProps {
  timeHistory: TypeTimeHistory[];
  time: ITimeHistory;
  index: number;
  formatTime: (num: number) => string | number;
  round: number;
}

const HistoryList: FC<IHistoryListProps> = ({
  timeHistory,
  time,
  formatTime,
  index,
  round,
}) => {
  return (
    <>
      <ListItem
        sx={ClonometerListItemStyle}
      >
        Round: {round}
        <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
          Tur {time.step} yarandi
          {
            timeHistory?.find((history) => history.step === time.step)
              ?.createdDate
          }
        </Typography>
        <Typography sx={{ fontSize: "18px" }}>
          {formatTime(time.min)}:{formatTime(time.sec)}:{formatTime(time.ms)}
        </Typography>
      </ListItem>
      {index < timeHistory.length - 1 && (
        <Divider sx={{ backgroundColor: "#555" }} />
      )}
    </>
  );
};

export default memo(HistoryList);
