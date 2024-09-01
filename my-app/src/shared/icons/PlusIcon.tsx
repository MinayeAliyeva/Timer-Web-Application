import { IconButton } from "@mui/material";
import React, { FC } from "react";
import { HiPlus } from "react-icons/hi";
interface IProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
const PlusIcon: FC<IProps> = ({ onClick }) => {
  return (
    <IconButton onClick={onClick}>
      <HiPlus style={{ color: "#FF9500", fontSize: "30px" }} />
    </IconButton>
  );
};

export default PlusIcon;
