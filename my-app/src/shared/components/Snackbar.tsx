import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";

export default function SnackBar({
  running,
  handleClose,
  element,
}: {
  running?: boolean;
  handleClose: () => void;
  element?: React.ReactElement;
}) {
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
      <button>yenile</button>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={running}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        // onClose={handleClose}
        message={'yenile'}
        action={action}
      >
        {element}
        </Snackbar>
    </div>
  );
}
