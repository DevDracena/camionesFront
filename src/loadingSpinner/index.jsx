// LoadingSpinner.jsx
import { Box } from "@mui/material";
import React from "react";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";


const LoadingSpinner = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-40%, -50%)",
        backGroundColor:"red"
      }}
    >
       <img
        style={{
          width: "100px",
          height: "100px",
        }}
        src="../../assets/white1.gif"
        alt="Loading..."
      />
      
     
    </Box>
  );
};

export default LoadingSpinner;
