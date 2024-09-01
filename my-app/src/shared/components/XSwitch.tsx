import Switch from "@mui/material/Switch";
import { FC } from "react";
interface IPropsSwitch {
  defaultChecked?: boolean;
  label?: {
    inputProps: {
      "aria-label": string;
    };
  };
}
const defaultLabel = { inputProps: { "aria-label": "Switch demo" } };
const XSwitch: FC<IPropsSwitch> = ({
  defaultChecked = false,
  label = defaultLabel,
}) => {
  return <Switch {...label} defaultChecked />;
};

export default XSwitch;
