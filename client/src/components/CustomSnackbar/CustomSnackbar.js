import { Alert, Slide, Snackbar } from "@mui/material";

const CustomSnackbar = ({ open, onClose, severity, message }) => {
  return (
    <>
      <Snackbar
        color=""
        open={open}
        autoHideDuration={5000}
        onClose={onClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        TransitionComponent={Slide}
      >
        <Alert onClose={onClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CustomSnackbar;
