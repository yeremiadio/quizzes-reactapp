import React, { forwardRef, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import SuccessAnimation from "../../../assets/images/checkbutton.gif";
import { Box, Typography } from "@material-ui/core";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ResultQuizIndicator = ({ setOpen, open }) => {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">Pemberitahuan</DialogTitle>
      <DialogContent>
        <Box
          display="flex"
          justifyContent="center"
          width="100%"
          alignItems="center"
          marginBottom={2}
        >
          <img src={SuccessAnimation} style={{ width: 220 }} alt="" />
        </Box>
        <DialogContentText align="center" id="alert-dialog-slide-description">
          <Typography variant="body1" gutterBottom color="textPrimary">
            Selamat! Anda telah mengerjakan kuis. Tunggu hasilnya ya.
          </Typography>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default ResultQuizIndicator;