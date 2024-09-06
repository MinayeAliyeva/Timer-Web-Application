import React, { memo } from "react";
import { Button, Modal, Box, Typography } from "@mui/material";

interface IAlarmModalProps {
  open: boolean;
  message: string | null;
  onClose: () => void;
  doLater: () => void;
}

const AlarmModal: React.FC<IAlarmModalProps> = ({
  open,
  message,
  onClose,
  doLater,
}) => {
  return (
    <Modal
      open={open}
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
          {message}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Button
            onClick={onClose}
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Kapat
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={doLater}
          >
            Ertele
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default memo(AlarmModal);
