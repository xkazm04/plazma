import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import { useTranslation } from "react-i18next";
import CreateReservation from "./CreateReservation";
import styled from "styled-components";

import Button from "../Buttons/FormButton";
import Title from "../Texts/Title";

// Alert
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import ParagraphText from "../Texts/ParagraphText";
import Loader from "react-spinners/GridLoader";

// Styled components
const Date = styled.h1`
  margin: 0rem 0rem 1.5rem 1.5rem;
`;

const NoVisitMessage = styled.p`
  font-style: italic;
  font-weight: lighter;
`;

const MyDialog = styled(Dialog)`
  background: black;
`;

const MyDialogContent = styled(DialogContent)`
  background: ${(props) => props.theme.colors.blackWhite};
`;

const MyAlert = styled(MuiAlert)`
  font-size: 20px;
`;

const useStyles = makeStyles(() => ({
  container: {},
  createReservation: {
    paddingLeft: "4%",
    width: "90%",
  },
  noVisitMessage: {
    paddingLeft: "4%",
    width: "90%",
  },
  createReservationTitle: {
    borderTop: "1px solid",
  },
  inputItem: {
    display: "flex",
    flexDirection: "column",
  },
}));

export default function NextVisit() {
  const { t } = useTranslation();
  const myDonorCode = localStorage.getItem("donorCode");
  const [nextVisit, setNextVisit] = useState(null);
  const [reservationId, setReservationId] = useState(null);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [resForm, setResForm] = useState(false)
  const openReservationForm = () => {
    setResForm(true)
  }

  // Loading
  const [isLoading, setLoading] = useState(true);

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
      <Title title={"Next reservation date"} />
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
                <Button onClick={openReservationForm} width="50%" label="Vytvořit rezervaci" />
              </div>
            {/* If new reservation requested */}
              {resForm ? <div> 
              <div className={classes.createReservationTitle}>
                <Title title={t("Create reservation")} />
              </div>
           <CreateReservation changeVisit={nextVisit => setNextVisit(nextVisit)}/> 
             </div>: null}
            </div>
          ) : (
            // Otherwise options to delete reservation
            <div>
              <ParagraphText
                content={
                  "Please arrive at least 30 minutes before the ordered time!!!"
                }
              />
              <Button
                onClose={handleClose}
                onClick={handleClickOpen}
                width="50%"
                label={t("visits.cancelReservation")}
              />
            </div>
          )}
        </div>
      )}
      {/* Slide dialog to delete reservation  */}
      <MyDialog open={open} keepMounted onClose={handleClose}>
        <MyDialogContent>
          <DialogTitle>
            {"Do you really want to cancel reservation??"}
          </DialogTitle>

          <DialogActions>
            <Button label="No" width="50%" onClick={handleClose} />
            <Button label="Confirm" width="50%" onClick={cancelReservation} />
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
        <MyAlert severity="success">Operation successful</MyAlert>
      </Snackbar>
    </div>
  );
}
