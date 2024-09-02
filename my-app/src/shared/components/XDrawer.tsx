import { useState, FC, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import { VscChromeClose } from "react-icons/vsc";
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
    setState((prevState) => ({ ...prevState, [anchor]: visible }));
  }, [visible, anchor]);

  const closeDrawer = () => {
    setState((prevState) => ({ ...prevState, [anchor]: false }));
  };

  return (
    <Box>
      <Drawer
        anchor={anchor}
        open={state[anchor]}
        onClose={closeDrawer}
        PaperProps={{
          sx: {
            borderRadius: "10px",
            padding: "20px",
            width: anchor === "left" || anchor === "right" ? "300px" : "100%",
            height: anchor === "top" || anchor === "bottom" ? "400px" : "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
          },
        }}
      >
        <XTimePicker />
        <IconButton
          onClick={closeDrawer}
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px",
            color: "grey.700",
          }}
        >
          <VscChromeClose style={{ fontSize: "30px" }} />
        </IconButton>
      </Drawer>
    </Box>
  );
};
