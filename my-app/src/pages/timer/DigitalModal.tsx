import React, { memo } from "react";
import { Modal, Button, Box, Typography } from "@mui/material";

interface AlertModalProps {
  open: boolean;
  handleClose: () => void;
  reStartTimer: () => void;
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
        sx={{
          backgroundColor: "#f8f8f8",
          padding: "20px",
          borderRadius: "20px",
          textAlign: "center",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          width: "80%",
          maxWidth: "400px",
        }}
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
            sx={{
              backgroundColor: "#e0e0e0",
              color: "#333",
              borderRadius: "15px",
              padding: "10px 20px",
              fontWeight: "bold",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#bdbdbd",
              },
            }}
          >
            Kapat
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default memo(AlertModal);
