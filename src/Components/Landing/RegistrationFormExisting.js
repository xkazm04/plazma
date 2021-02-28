// create.component.js

import React, { useRef, useState, useContext } from "react";
import { UserContext } from "../Utils/UserContext";
import { BranchContext } from "../Utils/BranchContext";
import useFormState from "../../hooks/useFormState";
import axios from "axios";
// Material UI form control
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";

import DataButton from "../Buttons/DataButton";
import Button from "../Buttons/FormButton";
import FormInput from "../Forms/FormInput";
import FormInputLabel from "../Forms/FormInputLabel";
import MyCheckbox from "../Buttons/Checkbox";
import GdprDialog from "../Texts/Gdpr";
import LinkButton from "../Buttons/LinkButton";
import ParagraphText from "../Texts/ParagraphText";
import ErrorMessage from "../Texts/ErrorMessage";

import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    position: "relative",
    justifyContent: "center",
  },
  formInputRow: {
    display: "flex",
    marginBottom: "0.2rem",
  },
  inputItem: {
    display: "flex",
    flexDirection: "column",
  },
  gdpr: {
    display: "flex",
    marginBottom: "2vh",
  },
  formContainer: {
    marginTop: "3vh",
  },
  dialogContainer: {
    paddingTop: "5px",
    padding: "2rem",
    paddingLeft: "5rem",
    minWidth: "150px",
  },
  dialogWarning: {
    paddingLeft: "4%",
  },
}));

const MyDialog = styled(Dialog)`
  background: black;
`;

const MyDialogContent = styled(DialogContent)`
  background: ${(props) => props.theme.colors.blackWhite};
`;

const token = '12345'

export default function RegistrationFormExisting({ location }) {
  const { t } = useTranslation();
  const classes = useStyles();
  const [error, setError] = useState(null);
  const { isAuth, setIsAuth } = useContext(UserContext);
  const { defaultBranch, setDefaultBranch } = useContext(BranchContext);
  const [donorCode, updateDonorCode] = useFormState("");
  const [email, updateEmail] = useFormState("");
  const [password, updatePassword] = useFormState("");
  const [repeatedPassword, updateRepeatedPassword] = useFormState("");

  // Registration form, allow only if password match
  const [regConfirm, setRegConfirm] = useState(false);
  const handleCloseRegConfirm = () => {
    setRegConfirm(false);
  };

  const handleOpenRegConfirm = () => {
    if (password === repeatedPassword) {
      console.log("Password ok");
      setError(null);
      setRegConfirm(true);
    } else {
      console.log("Password nok");
      setError("Chyba: Zadaná hesla nejsou shodná");
    }
  };

  // Gdpr dialog
  const [checked, setChecked] = useState(false);
  const [openGdpr, setOpenGdpr] = useState(false);
  const handleOpenGdpr = () => {
    setOpenGdpr(true);
  };
  const handleCloseGdpr = () => {
    setOpenGdpr(false);
  };
  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };

  // Form submit function
  const onSubmit = async (e) => {
    e.preventDefault();
    setDefaultBranch(location);
    try {
      const res = await axios({
        method: 'post',
        url: 'http://localhost:5000/api/customer',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token //the token is a variable which holds the token
        },
        data: {
          Username: email,
          Password: password,
          DonorCode: donorCode,
          DefaultSubcenterId: defaultBranch
      }
      });
      console.log("Yess");
      console.log(res.data)
      handleCloseRegConfirm();
      // Reset error message
      setError(null);
      // Go to login mode
      setIsAuth(true);
    }  catch (err) {
      // Error 😨
      if (err.response) { 
        // client received an error response (5xx, 4xx)
        console.log(err.response)
      } else if (err.request) { 
        // client never received a response, or request never left 
        console.log(err.request)
      } else { 
        // anything else 
      } 
    console.log(err);
    // setError(err);
    handleCloseRegConfirm();
    }
  };

  return (
    <div className={classes.container}>
      <div>
        <div className={classes.formContainer}>
          {/* Gdpr dialog */}
          <MyDialog open={openGdpr} onClose={handleCloseGdpr} maxWidth={"lg"}>
            <MyDialogContent>
              <DialogTitle>GDPR</DialogTitle>
              <GdprDialog location={location} />
              <DialogActions>
                <Button onClick={handleCloseGdpr} label={t('close')} />
              </DialogActions>
            </MyDialogContent>
          </MyDialog>
          <div>
            {/* Error message if state true */}
            {error ? <ErrorMessage title={error} /> : null}

            {/* Register from */}
            <div>
              <div className={classes.formInputRow}>
                <div className={classes.inputItem}>
                  <FormInputLabel label={"Email"} />
                  <FormInput
                    onChange={updateEmail}
                    width="200px"
                    smallerWidth="30vw"
                    placeholder={"mirekdusin@email.cz"}
                    type={"email"}
                    required
                  />
                </div>
                <div className={classes.inputItem}>
                  <FormInputLabel label={t('form_donorCode')} />
                  <FormInput
                    onChange={updateDonorCode}
                    width="200px"
                    smallerWidth="30vw"
                    placeholder={"DN123456789"}
                    type={"text"}
                    required
                  />
                </div>
              </div>
            </div>

            <div className={classes.formInputRow}>
              <div className={classes.inputItem}>
                <FormInputLabel label={t('password')}  />
                <FormInput
                  width="200px"
                  smallerWidth="30vw"
                  onChange={updatePassword}
                  placeholder={"****"}
                  type={"password"}
                />
              </div>

              <div className={classes.inputItem}>
                <FormInputLabel label={t('repeatPassword')} />
                <FormInput
                  width="200px"
                  smallerWidth="30vw"
                  onChange={updateRepeatedPassword}
                  placeholder={"****"}
                  type={"password"}
                />
              </div>
            </div>
            <div className={classes.gdpr}>
          <MyCheckbox checked={checked} onChange={handleCheck} />
          <LinkButton
            label={t('gdprAgree')}
            onClick={handleOpenGdpr}
          />
        </div>

            {checked === true ? (
              <Button onClick={handleOpenRegConfirm} label={t('register')}  />
            ) : null}
          </div>
        </div>
        {/* Register confirmation dialog */}
        <MyDialog
          open={regConfirm}
          onClose={handleCloseRegConfirm}
          maxWidth={"lg"}
        >
          <MyDialogContent>
            <DialogTitle>Confirm registration</DialogTitle>
            <div className={classes.dialogWarning}>
              <ParagraphText
                content=
                {t('checkRegisterData')}  
              />
            </div>
            <Grid
              container
              spacing={1}
              className={classes.dialogValuesContainer}
            >
              <Grid item sm={6}>
                <div className={classes.dialogContainer}>
                  <p className={classes.formP}>Email </p>
                </div>
              </Grid>
              <Grid item sm={6}>
                <div className={classes.dialogValuesContainer}>
                  <p>
                    <DataButton label={email} />
                  </p>
                </div>
              </Grid>
            </Grid>

            <DialogActions>
              <Button onClick={onSubmit} label={t('confirm')} />
              <Button onClick={handleCloseRegConfirm} label={t('close')}  />
            </DialogActions>
          </MyDialogContent>
        </MyDialog>
      </div>
    </div>
  );
}
