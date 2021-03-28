import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import axios from 'axios'

import Title from "../Components/Texts/Title";
import RegisterButton from "../Components/Buttons/RegisterButton";
import FilledButton from "../Components/Buttons/FilledButton";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from '@material-ui/core/TextField';
import SelectInput from '../Components/Forms/SelectInput'

import Grid from '@material-ui/core/Grid';
import {InfoMessage} from '../Components/Alerts/Alerts';
import moment from 'moment';
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



export default function CreateReservation() {
  const { t } = useTranslation();
  // Default Slot range for getting slots (2 months)
  const tomorrow = moment().add(1,'days').format("YYYY-MM-DD");
  const monthperiod = moment().add(60,'days').format("YYYY-MM-DD");
  // Timezone to pass in header (source: Browser)
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  const [open, setOpen] = useState(false);
  const [alertError, setAlertError] = useState(null)
  const [alertSuccess, setAlertSuccess] = useState(false)
  const [loading, setLoading] = useState(null)

  
  const [slots, setSlots] = useState([]);
  const [freeOptions, setFreeOptions] = useState([])
  const [slotSelected, setSelectedSlot] = useState([]);
  const token = localStorage.getItem('jwt');
  const subcenterid = localStorage.getItem('defaultSubcenter')

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createReservation = () => {
    setOpen(false);
  };

  const handleChange = (item) => {
    setSelectedSlot(item.value)
  }


    // Find Slots within default date range
    useEffect(() => {
      findSlots();
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }, []);

      // Get Slots for given time period
      // npm install -g json-server
      // json-server --watch db.json --port 3001
      // Will be needed to adjust response
      const findSlots = async () => {
        try {
          const res = await axios({
            method: "get",
            url: 'http://localhost:3001/slots',
            data: {
              From: tomorrow,
              To: monthperiod,
              SubcenterId: subcenterid 
            },
        // Hardcoded timezone
            headers: { 
              Authorization: `Bearer ${token}`,
              ai_tzn: timezone
            }
          });
          console.log(res.data);
          setSlots(res.data);
          
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


      //0. Filter free slots
     const filterSlotFunction = () => {
        const freeSlots = slots.filter(d => d.slotCapacityTotal > d.slotCapacityUsed);
        if (freeSlots.length === 0) {
          //do something if there isn't a match
          alert("sorry there are no results for that search");
          
        } else{
      //1. Get unique free dates from Slots (Stringify x Reduce x Slice)
      //2. Highlight unique dates in Datepicker
      //3. Filter slots
          setFreeOptions(freeSlots)
        }
      }
      const options = freeOptions.map(d => ({
        "value" : d.id,
        "label" : (d.timeFrom).slice(11, -3)
      }))
  // Register api

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
      console.log(res)
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
    // Clear states, redirect
  };

  return (
    <div>
      <Grid container spacing={0} justify="center" >
        <Title title="Reservation - Under construction"/>
        <CreateReservationContainer>
        <Grid item xs={12} lg={12}>
        <DateField
        id="date"
        label="Termín"
        type="date"
        defaultValue="2017-05-24T10:30"
        onChange={filterSlotFunction}
        InputLabelProps={{
          shrink: true,
        }}
      />
 </Grid>

        {/* Display found slots via radio buttons */}
        {freeOptions.length != 0 ?
            <SelectInput
              onChange={handleChange}
              options={options}
              placeholder={'Vyberte termín rezervace'}
              noOptionsMessage={''}
            /> : null }
     
        {/* If no slots found */}
        {slots ? null : <p>{t("reservation_noSlotsAvailable")}</p>}

        {/* Enable Create reservation button only if Slot selected */}
        {slotSelected.length != 0 ? (
          <FilledButton
            label={t("reservation_createReservationNew")}
            onClick={handleClickOpen}
          />
        ) : null}
        <InfoMessage message={"Please arrive at least 30 minutes before the ordered time."}/>
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
