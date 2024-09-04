import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MultiSectionDigitalClock } from "@mui/x-date-pickers/MultiSectionDigitalClock";
import { FC } from "react";

interface IProps {
  onChangeTime?: (value: any,  option: any) => void;
}

export const DigitalTimer: FC<IProps> = ({onChangeTime}) => {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        sx={{ backgroundColor: "#fff" }}
        components={[
          "MultiSectionDigitalClock",
          "MultiSectionDigitalClock",
          "MultiSectionDigitalClock",
        ]}
      >
        <DemoItem label={'"hours", "minutes" and "seconds"'}>
          <MultiSectionDigitalClock
            // value={timeRef.current}
            onChange={onChangeTime}
            views={["hours", "minutes", "seconds"]}
            ampm={false}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
};
