import { FC, useEffect, useState } from "react";
import { Button, Modal, Box, Typography } from "@mui/material";

interface INotificationProps {
  open: boolean;
  onCancel: () => void;
}

const XNotification: FC<INotificationProps> = ({ open, onCancel }) => {
  const [state, setState] = useState<{ visible: boolean }>({ visible: false });
  useEffect(() => {
    setState({ ...state, visible: open });
  }, [open]);
  const onClose = () => {
    console.log("modal close");
    setState({ ...state, visible: false });
  };
  return (
    <Modal
      open={state.visible}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "300px",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          borderRadius: "8px",
          textAlign: "center",
        }}
      >
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
          <Button variant="contained" color="primary" onClick={onClose}>
            EVET
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              onCancel();
              onClose();
            }}
          >
            HAYIR
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default XNotification;
