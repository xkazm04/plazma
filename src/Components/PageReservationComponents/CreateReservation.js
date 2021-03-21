import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import axios from 'axios'

import Title from "../Texts/Title";
import RegisterButton from "../Buttons/RegisterButton";
import FilledButton from "../Buttons/FilledButton";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from '@material-ui/core/TextField';

import Grid from '@material-ui/core/Grid';

const dummySlots = [
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
]
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
    background: ${(props) => props.theme.colors.blackWhite};
  `;

  const MyDialogContent = styled(DialogContent)`
    background: ${(props) => props.theme.colors.blackWhite};
  `;


// Create reservation from
  const CreateReservationContainer = styled.div`
    margin: 1%;
    background: white;
    padding: 5%;
  `

  const DateField = styled(TextField)`
    width: 100%;
  `




  const { t } = useTranslation();
  const [slots, setSlots] = useState([]);
  const [slotSelected, setSlot] = useState(null);
  const pickSlot = (event) => {
    setSlot(event.target.value);
  };

      // Login request
      const findSlots = async () => {
        try {
          const res = await axios.post("https://virtserver.swaggerhub.com/xkazm04/User/1.0.0/login");
          console.log(slots);
          setSlots(dummySlots)
        } catch (err) {
          // Error
          if (err.response) { 
            // client received an error response (5xx, 4xx)
            console.log(err.response)
          } else if (err.request) { 
            // client never received a response, or request never left 
            console.log(err.request)
          } else { 
            // anything else 
          } 
        }
      };

  // Dummy toggle found slots

  const [slotFound, setSlotFound] = useState(false);


  const handleFindNewTerm = () => {
    setSlotFound(true);
    findSlots();
  };

  const onSubmit = async () => {
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
    <div>
      <Grid container spacing={0} justify="center" >
        <CreateReservationContainer>
        <Grid item xs={12} lg={12}>
        <DateField
        id="date"
        label="Termín"
        type="date"
        defaultValue="2017-05-24T10:30"
        InputLabelProps={{
          shrink: true,
        }}
      />
 </Grid>
         {/* Find slot */}
        <FilledButton
          label={t("visits.findSlots")}
          onClick={handleFindNewTerm}
        />
        
        {/* Display found slots via radio buttons */}
        {slotFound ? null : null}
        {slotFound ? (
          <RadioGroup row value={slotSelected} onChange={pickSlot}>
            {slots.map((slot) => (
              <FormControlLabel
                value={slot.value}
                control={<Radio />}
                label={slot.label}
                onChange={pickSlot}
              />
            ))}
          </RadioGroup>
        ) : null}

        {/* If no slots found */}
        {slots ? null : <p>{t("reservation_noSlotsAvailable")}</p>}
        {slotSelected != null ? (
          <FilledButton
            label={t("reservation_createReservationNew")}
            onClick={handleClickOpen}
          />
        ) : null}
        </CreateReservationContainer>
      </Grid>
      {/* Slide dialog  */}
      <MyDialog open={open} onClose={handleClose} keepMounted>
        <MyDialogContent>
          <DialogTitle>
            {t("reservation_createReservationConfirmation")} {"?"}
          </DialogTitle>
          <Title title={slotSelected} />
          <DialogActions>
            <RegisterButton label={t("button_no")} width="50%" onClick={handleClose} />
            <FilledButton
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
