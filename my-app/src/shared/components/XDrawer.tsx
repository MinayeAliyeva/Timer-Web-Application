import { useState, FC, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { VscChromeClose } from "react-icons/vsc";
import { IconButton } from "@mui/material";
import XTimePicker from "./XTimePicker";

type Anchor = "top" | "left" | "bottom" | "right";
interface IPropsAnchor {
  anchor?: Anchor;
  visible?: boolean;
}
export const AnchorTemporaryDrawer: FC<IPropsAnchor> = ({
  anchor = "bottom",
  visible = false,
}) => {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  useEffect(() => {
    setState({ ...state, [anchor]: visible });
  }, [visible]);
  const closeDrawer = () => {
    setState({ ...state, [anchor]: false });
  };
  return (
    <Box>
      {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
      <Drawer
        anchor={anchor}
        open={state[anchor]}
        // onClose={toggleDrawer(anchor, false)}
      >
        {/* {list(anchor)} */}
        hhh
        <XTimePicker />
        <VscChromeClose
          onClick={closeDrawer}
          style={{ cursor: "pointer", fontSize: "30px" }}
        />
      </Drawer>
    </Box>
  );
};
