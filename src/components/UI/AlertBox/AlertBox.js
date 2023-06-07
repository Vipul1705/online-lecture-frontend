import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const AlertBox = ({
  open,
  handleClose,
  desc,
  title,
  leftBtnTitle,
  leftBtnAction,
  rightBtnTitle,
  rightBtnAction,
}) => {
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ color: "#8b151b" }}>
          {title}
          {handleClose ? (
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          ) : null}
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="alert-dialog-description" sx={{ p: 2 }}>
            {desc}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {leftBtnTitle ? (
            <Button
              variant="outlined"
              sx={{ mt: 1, mb: 1 }}
              onClick={leftBtnAction}
            >
              {leftBtnTitle}
            </Button>
          ) : null}
          {rightBtnTitle ? (
            <Button
              variant="contained"
              sx={{ mt: 1, mb: 1 }}
              onClick={rightBtnAction}
              autoFocus
            >
              {rightBtnTitle}
            </Button>
          ) : null}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AlertBox;
