import { Alert, Snackbar } from "@mui/material";
import { FC, memo } from "react";

interface IPropsAlarmSnackBAr {
  handleAlertClose: () => void;
  openSnackbar: boolean;
  alertMessage: string | null;
}

const AlarmSnackBar: FC<IPropsAlarmSnackBAr> = ({
  handleAlertClose,
  openSnackbar,
  alertMessage,
}) => {
  return (
    <Snackbar
      style={{ backgroundColor: "red" }}
      open={openSnackbar}
      autoHideDuration={null}
      onClose={handleAlertClose}
    >
      <Alert
        onClose={handleAlertClose}
        severity="warning"
        sx={{ width: "100%" }}
      >
        {alertMessage}
      </Alert>
    </Snackbar>
  );
};

export default memo(AlarmSnackBar);
