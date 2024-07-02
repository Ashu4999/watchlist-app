import React from "react";
import { Snackbar, Alert } from "@mui/material";

const GenericSnackbar = ({ open, message, severity, onClose, ...props }) => {
  return (
    <Snackbar
      open={open}
      onClose={onClose}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      {...props}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default GenericSnackbar;
