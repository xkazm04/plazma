// create.component.js

import React, { useState, useContext } from "react";
import { UserContext } from "../Utils/UserContext";
import useFormState from "../../hooks/useFormState";
import axios from "axios";
// Material UI form control
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import Button from "../Buttons/FormButton";
import FormInput from "../Forms/FormInput";
import FormInputLabel from "../Forms/FormInputLabel";
import MyCheckbox from "../Buttons/Checkbox";
import GdprDialog from "../Texts/Gdpr";
import LinkButton from "../Buttons/LinkButton";
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


export default function RegistrationFormExisting({ branch, password, email }) {
  const { t } = useTranslation();
  const classes = useStyles();
  const [error, setError] = useState(null);
  const { setIsAuth } = useContext(UserContext);
  const [donorCode, updateDonorCode] = useFormState(null);
  const [formEmail, updateFormEmail] = useFormState(email);
  const [formPassword, updateFormPassword] = useFormState(password);
  const [repeatedPassword, updateRepeatedPassword] = useFormState("");



  // Input validations
  const checkEmptyDonor = () => {
    if (donorCode == null) {
      console.log("fuck")
      setError("Chyba: Kod dárce není vyplněn");
    } else {
      console.log("donor code ok")
      checkPassword()
    }
  }

  const checkPassword = () => {
    if (formPassword === repeatedPassword) {
      console.log("Password ok");
      setError(null);
      onSubmit();
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
  const onSubmit = async () => {
    try {
      const res = await axios({
        method: 'post',
        url: "https://virtserver.swaggerhub.com/xkazm04/User/1.0.0/register",
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
          "Content-Type": "application/json"
        },
        data: {
          Username: formEmail,
          Password: formPassword,
          DonorCode: donorCode,
          DefaultSubcenterId: branch
      }
      });
      console.log(res.data)
      // Reset error message
      localStorage.setItem('defaultSubcenter', branch)
      setError(null);
      // Go to login mode
      setIsAuth(true);
    }  catch (err) {
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
    console.log(err);
    setError(err);
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
              <GdprDialog branch={branch} />
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
                    value={formEmail}
                    onChange={updateFormEmail}
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
                  value={formPassword}
                  width="200px"
                  smallerWidth="30vw"
                  onChange={updateFormPassword}
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
              <Button onClick={checkEmptyDonor} label={t('register')}  />
            ) : null}

          </div>
        </div>
      </div>
    </div>
  );
}
