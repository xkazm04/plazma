import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import Button from "../Buttons/FormButton";
import Title from "../Texts/Title";
import FormInput from "../Forms/FormInput";
import FormInputLabel from "../Forms/FormInputLabel";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },
}));

export default function CreateReservation({ changeVisit }) {
  const [date, setDate] = useState();
  const [open, setOpen] = useState(false);

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
      value: "10:15",
    },
    {
      label: "10:30",
      value: "10:30",
    },
    {
      label: "10:45",
      value: "10:45",
    },
    {
      label: "11:00",
      value: "11:00",
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

  return (
    <div className={classes.container}>
      <div className={classes.inputItem}>
        <FormInputLabel label={"Reservation date test daypicker"} />
        <DatePicker
          selected={date}
          onChange={setDate}
          dateFormat="dd/MM hh:mm"
          minDate={new Date()}
          isClearable
          showYearDropdown
          scrollableMonthYearDropdown
          showTimeSelect
          timeIntervals={60}
          title={"ahoj"}
          customInput={<input type="text" placeholder="place" />}
          // maxDate={"03/03/2022"}
        />
      </div>
      <div className={classes.inputItem}>
        <FormInputLabel label={"Reservation date"} />
        <FormInput onChange={setDate} type={"date"} />
      </div>
      <div className={classes.inputItem}>
        <FormInputLabel label={"Reservation time"} />
        <FormInput onChange={setDate} type={"time"} />
      </div>
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
          <Title title={"Monday 16.02." + slotSelected} />
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
