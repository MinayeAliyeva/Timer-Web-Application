import Switch from "@mui/material/Switch";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { toogleIsActive } from "../../store/features/alarmSlice";

interface IPropsSwitch {
  defaultChecked?: boolean;
  label?: {
    inputProps: {
      "aria-label": string;
    };
  };
  isActive: any;
  alarmId: number;
}

const defaultLabel = { inputProps: { "aria-label": "Switch demo" } };

const XSwitch: FC<IPropsSwitch> = ({
  label = defaultLabel,
  isActive = false,
  alarmId,
}) => {
  const dispatch = useDispatch();
  const changeIsActive = () => {
    dispatch(toogleIsActive({ isActive, alarmId }));
  };

  return <Switch {...label} checked={isActive} onChange={changeIsActive} />;
};

export default XSwitch;
