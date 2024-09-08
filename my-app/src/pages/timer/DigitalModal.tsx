import React, { memo } from "react";
import { Modal, Button, Box, Typography } from "@mui/material";
import { DigitalModalBoxStyle, ModalButtonStyle } from "../../constands/style";

interface AlertModalProps {
  open: boolean;
  handleClose?: () => void;
  reStartTimer?: () => void;
}

const AlertModal: React.FC<AlertModalProps> = ({
  open,
  handleClose,
  reStartTimer,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={DigitalModalBoxStyle}
      >
        <Typography variant="h6" sx={{ mb: 2, color: "#333" }}>
          Zaman Doldu!
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: "#555" }}>
          Ne yapmak istersiniz?
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#007aff",
              color: "#fff",
              borderRadius: "15px",
              padding: "10px 20px",
              fontWeight: "bold",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#005bb5",
              },
            }}
            onClick={reStartTimer}
          >
            Yenile
          </Button>
          <Button
            variant="contained"
            onClick={handleClose}
            sx={ModalButtonStyle}
          >
            Kapat
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default memo(AlertModal);
