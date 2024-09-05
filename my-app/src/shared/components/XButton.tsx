import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { FC } from "react";
interface IProps {
  handleStart: () => void;
  setDrawerOpen: (arg: boolean) => void;
}
export const XButton: FC<IProps> = ({ handleStart, setDrawerOpen }) => {
  return (
    <Stack
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px",
        marginLeft: "150px",
      }}
      spacing={2}
      direction="row"
    >
      <Button
        onClick={() => {
          handleStart();
          setDrawerOpen(false);
        }}
        sx={{
          width: "90px",
          height: "90px",
          borderRadius: "50%",
          backgroundColor: "#0080004a",
          color: "green",
        }}
        variant="contained"
      >
        Başla
      </Button>
    </Stack>
  );
};
