import React, { memo } from "react";
import { Button, Modal, Box, Typography } from "@mui/material";
import { AlarmModalBoxStyle } from "../../constands/style";

interface IAlarmModalProps {
  open: boolean;
  message?: string | null;
  onClose?: () => void;
  doLater?: () => void;
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
        sx={AlarmModalBoxStyle}
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
