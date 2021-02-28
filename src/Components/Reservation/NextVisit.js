import { useState} from "react";

import { useTranslation } from "react-i18next";
import CreateReservation from "./CreateReservation";
import styled from "styled-components";

import Button from "../Buttons/FormButton";
import Title from "../Texts/Title";

import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import ParagraphText from "../Texts/ParagraphText";

// Styled components
const Date = styled.h1` 
    margin: 0rem 0rem 1.5rem 1.5rem;
  }
`

const NoVisitMessage = styled.p` 
    font-style: italic;
    font-weight: lighter;
  }
`

const MyDialog = styled(Dialog)`
  background: black;
`

const MyDialogContent = styled(DialogContent)`
  background: ${props => props.theme.colors.blackWhite};
`

const useStyles = makeStyles(() => ({
  container: {
  },
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
  inputItem:{
    display: 'flex',
    flexDirection: 'column',
},
}));

// Delete route

// Create route

// Get route - use effect

export default function NextVisit() {
  const { t } = useTranslation();
  const [createVisible, setCreateVisible] = useState(false);
  // Temporary
  const [nextVisit, setNextVisit] = useState("16.10.2021");
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  // Alert dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteReservation = () => {
    setNextVisit(null);
    setOpen(false);
  };

  return (
    <div className={classes.container}>
      <Title title={"Next reservation date"} />
      <br></br>
      <Date>{nextVisit} </Date>
      {/* If no planned reservation, show message and option to create new one */}
      {nextVisit === null ? (
        <div className={classes.createReservation}>
          <div className={classes.noVisitMessage}>
            <NoVisitMessage>
              {t("noNextReservation")}
            </NoVisitMessage>
          </div>
          <div className={classes.createReservationTitle}>
            <Title title={t("Create reservation")} />
          </div>
          {/* K čemu Create visible */}
          <CreateReservation createVisible={createVisible} />
        </div>
      ) : (
        // Otherwise options to delete reservation
        <div>
          <ParagraphText content={"Please arrive at least 30 minutes before the ordered time!!!"} />
          <Button
            onClose={handleClose}
            onClick={handleClickOpen}
            width="50%"
            label={t("visits.cancelReservation")}
          />
        </div>
      )}

      {/* Slide dialog to delete reservation  */}
      <MyDialog open={open} keepMounted onClose={handleClose}>
        <MyDialogContent>
        <DialogTitle>{"Do you really want to cancel reservation??"}</DialogTitle>

        <DialogActions>
          <Button label="No" width="50%" onClick={handleClose} />
          <Button label="Confirm" width="50%" onClick={handleDeleteReservation} />
        </DialogActions>
        </MyDialogContent>
      </MyDialog>
    </div>
  );
}
