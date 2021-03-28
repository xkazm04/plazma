import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link} from 'react-router-dom'

import { useTranslation } from "react-i18next";
import styled from "styled-components";

import RegisterButton from "../../Buttons/RegisterButton";
import FilledButton from "../../Buttons/FilledButton";
import DeleteButton from "../../Buttons/DeleteButton";
import ParagraphText from "../../Texts/ParagraphText";
import Loader from "react-spinners/GridLoader";
import {ErrorMessage, InfoMessage} from '../../Alerts/Alerts';

// Icons
import {EmptyReservationIcon} from '../../Icons/Icons'

// Alert
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

// Styled components
const Kontejner = styled.div`
  margin: 10px;
  background: white;
  @media screen and (max-width: 1000px) {
    width: 80%;
  }
`
const MainGrid = styled(Grid)`
 border-top: 2px solid red;
 border-radius: 15px;
`

const UpcomingTitle = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 21px;
  letter-spacing: -0.02em;
  color: #828282;
`

const Date = styled.h1`
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 150%;
  letter-spacing: -0.02em;
  color: #0C2043;
`;

const NoVisitMessage = styled.p`
  font-weight: normal;
  color: #8690A1;
  font-size: 18px;
  text-align: left;
  margin-left: 120px;
  display: flex;
`;

const EmptyIcon = styled.div`
  position: absolute;
`

const DeleteIcon = styled.div`
  position: absolute;
  left: 92%;
  top: 30px;
`
 

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
      // TODO - Pass to existing api
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

        <MainGrid container spacing={0} direction="column" >
        {isLoading ? (
        <Grid item xs={12} lg={12}> <Loader size={5} color={"#f54275"} loading={isLoading} /></Grid>
      ) : (   
          <Kontejner>

            {nextVisit !== null ? <>
            <Grid item sm={12} lg={12}> <UpcomingTitle>{t("reservation_next")}</UpcomingTitle></Grid>
            <DeleteIcon><DeleteButton onClick={handleClickOpen} label={'label'} /> </DeleteIcon></> : null}
            <Grid item sm={12} lg={12}> <Date>{nextVisit} </Date></Grid>
          {/* If no planned reservation, show message and option to create new one */}

          {nextVisit === null ? (
            <>
               <Grid item sm={12} lg={12}> 
                <EmptyIcon><EmptyReservationIcon/></EmptyIcon>
                <NoVisitMessage>{t("noNextReservation")}</NoVisitMessage>
               </Grid>
                
                <Grid item sm={12} lg={12}> <Link to="/CreateReservation">  <FilledButton  label={t("Create reservation")}  /></Link></Grid>   
            </>
          ) : (
            // Otherwise options to delete reservation
            <div>
              {error ? <ErrorMessage title={error} message={errorMessage} /> :
               <InfoMessage message={t("reservation_warning")} />}
            </div>
          )}

          </Kontejner>
           )}
        </MainGrid>
     
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
