import { Box, Typography } from "@mui/material";
import TimeList from "../components/List";

const TimeZones = () => {
  return (
    <Box style={{  padding:"50px 100px" }}>
      <Typography style={{fontSize:'25px',fontWeight:"bold",color:"#fff"}}>Dünya Saati</Typography>
      <TimeList/>
    </Box>
  );
};

export default TimeZones;
