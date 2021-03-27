import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link} from 'react-router-dom'

import { useTranslation } from "react-i18next";
import styled from "styled-components";

import RegisterButton from "../Buttons/RegisterButton";
import FilledButton from "../Buttons/FilledButton";
import TitleHuge from "../Texts/TitleHuge";

// Icons
import {EmptyReservationIcon} from '../Icons/Icons'

// Alert
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import ParagraphText from "../Texts/ParagraphText";
import Loader from "react-spinners/GridLoader";
import {ErrorMessage} from '../Alerts/Alerts';

// Styled components
const Date = styled.h1`
  margin: 0rem 0rem 1rem 0rem;
`;

const NoVisitMessage = styled.p`
  font-weight: normal;
  color: #8690A1;
  font-size: 18px;
  text-align:center;
`;

const MyDialog = styled(Dialog)`
   background: ${(props) => props.theme.Primary.Shade};
   margin-top:50px;
`;

const MyDialogContent = styled(DialogContent)`
  background: ${(props) => props.theme.Primary.Shade};
  margin-top: 5px;
  min-width: 400px;
  @media screen and (max-width: 800px) {
    min-width: 10px;
  }
`;

const Kontejner = styled.div`
  background: white;
  padding: 3%;
  @media screen and (max-width: 1000px) {
    width: 100%;
  }
`
 
export default function NextVisit() {
  const { t } = useTranslation();
  const [isLoading, setLoading] = useState(true);
  const myDonorCode = localStorage.getItem("donorCode");
  const [nextVisit, setNextVisit] = useState(null);
  const [reservationId, setReservationId] = useState(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  

  // Alert dialog
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const handleClickOpenSuccessAlert = () => {
    setSuccessAlertOpen(true);
  };
  const handleCloseSuccessAlert = () => {
    setSuccessAlertOpen(false);
  };
  // Cancel reservation
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // Get next reservation based on Donor Id
  const getNextReservation = async () => {
    try {
      const res = await axios({
        method: "post",
        url:
          "https://virtserver.swaggerhub.com/xkazm04/User/1.0.0/getNextReservationDate",
        data: {
          DonorCode: myDonorCode,
        },
      });
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      console.log(res.data);
      setNextVisit(res.data.NextReservationDate);
      setReservationId(res.data.ReservationId);
      // Reset error message
    } catch (err) {
      // Error
      if (err.response) {
        // client received an error response (5xx, 4xx)
        console.log(err.response);
      } else if (err.request) {
        console.log(err)
        setError(t("error_common"))
        setErrorMessage(t("error_message_common"))
        setLoading(false);
      } else {
        // anything else
      }
      console.log(err);
    }
  };

  // Call function upon component loading
  useEffect(() => {
    getNextReservation();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  // Cancel reservation API
  const cancelReservation = async () => {
    try {
      // TODO - Pass to existing 
      const res = await axios({
        method: "post",
        timeout: 5000,
        url: "https://virtserver.swaggerhub.com/xkazm04/User/1.0.0/getNextReservationDate",
        data: {
          Id: reservationId,
        },
      });
      console.log(res.data);
      setNextVisit(null);
      setOpen(false);
      handleClickOpenSuccessAlert();
    } catch (err) {
      // Error
      if (err.response) {
        // client received an error response (5xx, 4xx)
        setOpen(false);
        console.log(err.response);
      } else if (err.request) {
        setOpen(false);
        setError(t("error_common"))
        setErrorMessage(t("error_message_common"))
      } else {
        // anything else
      }
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
      <TitleHuge title={t("reservation_next")} />
      <br></br>
      {isLoading ? (
        <Loader size={10} color={"#f54275"} loading={isLoading} />
      ) : (
        <Grid container   spacing={0}
        direction="column"
        alignItems="center"
        justify="center" >
          <Kontejner>
          <Date>{nextVisit} </Date>
          {/* If no planned reservation, show message and option to create new one */}

          {nextVisit === null ? (
            <>
               <EmptyReservationIcon/>
                <NoVisitMessage>{t("noNextReservation")}</NoVisitMessage>
                <Link to="/CreateReservation">  <FilledButton width="327px" label={t("Create reservation")}  /></Link>
            </>
          ) : (
            // Otherwise options to delete reservation
            <div>
              <ParagraphText
                content={
                  t("reservation_warning")
                }
              />
              {error ? <ErrorMessage title={error} message={errorMessage} /> : null}
              <FilledButton
                onClose={handleClose}
                onClick={handleClickOpen}
                label={t("visits.cancelReservation")}
              />
            </div>
          )}
          </Kontejner>
        </Grid>
      )}
      {/* Slide dialog to delete reservation  */}
      <MyDialog open={open} onClose={handleClose}>
        <MyDialogContent>
          <ParagraphText content={t("reservation_cancel")}/> 
          <DialogActions>
             <FilledButton label={t("button_confirm")} width="50%" onClick={cancelReservation} />
             <RegisterButton label={t("button_no")} width="50%" onClick={handleClose} />
          </DialogActions>
        </MyDialogContent>
      </MyDialog>
      {/* Alerts */}
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
          open={successAlertOpen}
          autoHideDuration={5000}
          onClose={handleCloseSuccessAlert}
      >
        <MuiAlert severity="success">{t("alert.reservation_canceled")}</MuiAlert>
      </Snackbar>
    </>
  );
}
