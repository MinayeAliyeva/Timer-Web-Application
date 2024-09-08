import { FC, useEffect, useState } from "react";
import { Button, Modal, Box, Typography } from "@mui/material";
import { NotificationBoxStyle } from "../../constands/style";

interface INotificationProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const XNotification: FC<INotificationProps> = ({
  open,
  onCancel,
  onConfirm,
}) => {
  const [state, setState] = useState<{ visible: boolean }>({ visible: false });

  useEffect(() => {
    console.log("open useeff", open);
    setState({ ...state, visible: open });
  }, [open]);
  
  const onClose = () => {
    setState({ ...state, visible: false });
    onCancel();
  };
  console.log("visible", state.visible);
  console.log("open", open);

  return (
    <Modal
      open={state.visible}
      // onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={NotificationBoxStyle}>
        <Typography id="modal-title" variant="h6" component="h2">
          BU ALARMIN ZAMANI GEÇMİŞ YARINA AYARLANSINMI?
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            marginTop: 2,
          }}
        >
          <Button variant="contained" color="primary" onClick={onConfirm}>
            EVET
          </Button>
          <Button variant="contained" color="primary" onClick={onClose}>
            HAYIR
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default XNotification;
