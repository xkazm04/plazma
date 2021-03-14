import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import axios from 'axios'

import Button from "../Buttons/FormButton";
import Title from "../Texts/Title";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from '@material-ui/core/TextField';



const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  inputItem: {
    marginBottom: '5%'
  }
}));

export default function CreateReservation({ changeVisit }) {
  const [date, setDate] = useState();
  const [open, setOpen] = useState(false);
  const [alertError, setAlertError] = useState(null)
  const [slotStart, setSlotStart] = useState()
  const [slotEnd, setSlotEnd] = useState()
  const [loading, setLoading] = useState(null)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createReservation = () => {
    setOpen(false);
    changeVisit(slotSelected);
  };

  // Dialog
  const MyDialog = styled(Dialog)`
    background: black;
  `;

  const MyDialogContent = styled(DialogContent)`
    background: ${(props) => props.theme.colors.blackWhite};
  `;

  const { t } = useTranslation();
  const classes = useStyles();
  const [slots, setSlots] = useState([
    {
      label: "10:15",
      value: "Monday 12.1. 10:15",
    },
    {
      label: "10:30",
      value: "Monday 12.1. 10:30",
    },
    {
      label: "10:45",
      value: "Monday 12.1. 10:45",
    },
    {
      label: "11:00",
      value: "Monday 12.1. 11:00",
    },
  ]);

  const [slotSelected, setSlot] = useState(null);
  const pickSlot = (event) => {
    setSlot(event.target.value);
  };

  // Dummy toggle found slots

  const [slotFound, setSlotFound] = useState(false);

  const handleFindNewTerm = () => {
    setSlotFound(true);

  };

  const onSubmit = async (e) => {
    setLoading(true);
    try {
      const res = await axios({
        method: "post",
        url: "https://virtserver.swaggerhub.com/xkazm04/User/1.0.0/register",
      });
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } catch (err) {
      // Error 😨
      if (err.response) {
        // client received an error response (5xx, 4xx)
        console.log(err.response);
        setLoading(false);
      } else if (err.request) {
        // client never received a response, or request never left
        console.log(err.request);
        setLoading(false);
      } else {
        // anything else
      }
      setAlertError(err.request);
      setLoading(false);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.inputItem}>
        <TextField
        id="datetime-local"
        label="od"
        type="datetime-local"
        defaultValue="2017-05-24T10:30"
        InputLabelProps={{
          shrink: true,
        }}
      />
              <TextField
        id="datetime-local"
        label="do"
        type="datetime-local"
        defaultValue={""}
        InputLabelProps={{
          shrink: true,
        }}
      />
      </div>
      {/* <div className={classes.inputItem}>
        <FormInputLabel label={"Reservation date"} />
        <FormInput onChange={setDate} type={"date"} />
      </div>
      <div className={classes.inputItem}>
        <FormInputLabel label={"Reservation time"} />
        <FormInput onChange={setDate} type={"time"} />
      </div> */}
      <div className={classes.inputItem}>
        {/* Find slot */}
        <Button
          width="50%"
          label={t("visits.findSlots")}
          onClick={handleFindNewTerm}
        />
        {/* Display found slots via radio buttons */}
        {slotFound ? (
          <RadioGroup value={slotSelected} onChange={pickSlot}>
            {slots.map((slot) => (
              <FormControlLabel
                value={slot.value}
                control={<Radio />}
                label={slot.label}
              />
            ))}
          </RadioGroup>
        ) : null}

        {/* If no slots found */}
        {slots ? null : <p>{t("reservation_noSlotsAvailable")}</p>}
        {slotSelected != null ? (
          <Button
            width="50%"
            label={t("reservation_createReservationNew")}
            onClick={handleClickOpen}
          />
        ) : null}
      </div>

      {/* Slide dialog  */}
      <MyDialog open={open} onClose={handleClose} keepMounted>
        <MyDialogContent>
          <DialogTitle>
            {t("reservation_createReservationConfirmation")} {"?"}
          </DialogTitle>
          <Title title={slotSelected} />
          <DialogActions>
            <Button label={t("button_no")} width="50%" onClick={handleClose} />
            <Button
              label={t("reservation_createReservationButton")}
              width="50%"
              onClick={createReservation}
            />
          </DialogActions>
        </MyDialogContent>
      </MyDialog>
    </div>
  );
}
