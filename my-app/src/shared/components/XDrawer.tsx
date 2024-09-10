import { useState, FC, useEffect, memo } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import XTimePicker from "./XTimePicker";
import IconButton from "@mui/material/IconButton";
import { VscChromeClose } from "react-icons/vsc";
type Anchor = "top" | "left" | "bottom" | "right";
interface IPropsAnchor {
  anchor?: Anchor;
  visible?: boolean;
  closeDrawer: () => void;
  top?: false;
  left?: false;
  bottom?: false;
  right?: false;
}

interface IState {
  top: boolean;
  left: boolean;
  bottom: boolean;
  right: boolean;
  open?: boolean;
}
export const AnchorTemporaryDrawer: FC<IPropsAnchor> = memo(
  ({ anchor = "bottom", visible = false, bottom = false, closeDrawer }) => {
    // 1 + click visible = true
    // useEffect(() => {
    //   setState((prevState) => ({ ...prevState, open: visible }));
    //   // state.open = true visible=true
    // }, [visible, anchor]);

    // open = false

    return (
      <Box>
        <Drawer
          anchor={anchor}
          open={visible}
          PaperProps={{
            sx: {
              borderRadius: "10px",
              padding: "20px",
              width: "82%",
              margin: "auto",
              height:
                anchor === "top" || anchor === "bottom" ? "400px" : "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
            },
          }}
        >
          <XTimePicker onCloseDrawer={closeDrawer} />
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
  }
);
