import React, { useState, useEffect } from "react";
import axios from "axios";

import { useTranslation } from "react-i18next";
import CreateReservation from "./CreateReservation";
import styled from "styled-components";

import RegisterButton from "../Buttons/RegisterButton";
import FilledButton from "../Buttons/FilledButton";
import Button from "../Buttons/FormButton";
import Title from "../Texts/Title";

import CloseIcon from '@material-ui/icons/Close';

// Alert
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import ParagraphText from "../Texts/ParagraphText";
import Loader from "react-spinners/GridLoader";

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

const Xicon = styled(CloseIcon)`
  position: absolute;
  margin-left: 85%;
  color: ${(props) => props.theme.Primary.Main};
  &:hover{
    cursor:pointer;
    color: ${(props) => props.theme.Primary.Dark};
  };
  @media screen and (max-width: 1000px) {
    opacity: 0;
  }
`


const useStyles = makeStyles(() => ({
  container: {},
  noVisitMessage: {
    paddingLeft: "6%",
    width: "90%",
  },
  inputItem: {
    display: "flex",
    flexDirection: "column",
  },
}));

export default function NextVisit() {
  const { t } = useTranslation();
  const [isLoading, setLoading] = useState(true);
  const myDonorCode = localStorage.getItem("donorCode");
  const [nextVisit, setNextVisit] = useState(null);
  const [reservationId, setReservationId] = useState(null);
  const classes = useStyles();
  const [open, setOpen] = useState(false);


  // Reservation form
  const [resForm, setResForm] = useState(false)
  const openReservationForm = () => {
    setResForm(true)
  }
  

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
        // client never received a response, or request never left
        console.log(err.request);
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
      const res = await axios({
        method: "post",
        timeout: 5000,
        url:
          "https://virtserver.swaggerhub.com/xkazm04/User/1.0.0/cancelReservation",
        data: {
          ReservationId: reservationId,
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
        console.log(err.response);
      } else if (err.request) {
        // client never received a response, or request never left
        console.log(err.request);
      } else {
        // anything else
      }
      console.log(err);
    }
  };

  return (
    <div className={classes.container}>
      <Title title={t("reservation_next")} />
      <br></br>
      {isLoading ? (
        <Loader size={10} color={"#f54275"} loading={isLoading} />
      ) : (
        <div>
          <Date>{nextVisit} </Date>
          {/* If no planned reservation, show message and option to create new one */}

          {nextVisit === null ? (
            <div className={classes.createReservation}>
              <div className={classes.noVisitMessage}>
                <NoVisitMessage>{t("noNextReservation")}</NoVisitMessage>
                <FilledButton onClick={openReservationForm} width="327px" label={t("Create reservation")}  />
              </div>
            {/* If new reservation requested */}
              {resForm ? <div> 
           <CreateReservation changeVisit={nextVisit => setNextVisit(nextVisit)}/> 
             </div>: null}
            </div>
          ) : (
            // Otherwise options to delete reservation
            <div>
              <ParagraphText
                content={
                  t("reservation_warning")
                }
              />
              <FilledButton
                onClose={handleClose}
                onClick={handleClickOpen}
                label={t("visits.cancelReservation")}
              />
            </div>
          )}
        </div>
      )}
      {/* Slide dialog to delete reservation  */}
      <MyDialog open={open} onClose={handleClose}>
        <MyDialogContent>
          <Xicon onClick={handleClose}/>
          <ParagraphText content={t("reservation_cancel")}/> 
          <DialogActions>
             <RegisterButton label={t("button_no")} width="50%" onClick={handleClose} />
             <FilledButton label={t("button_confirm")} width="50%" onClick={cancelReservation} />
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
        <MuiAlert severity="success">Yeeeah</MuiAlert>
      </Snackbar>
    </div>
  );
}
