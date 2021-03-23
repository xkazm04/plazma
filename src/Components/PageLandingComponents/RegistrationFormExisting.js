// create.component.js

import React, { useState, useContext } from "react";
import { UserContext } from "../Utils/UserContext";
import useFormState from "../../hooks/useFormState";
import axios from "axios";
// Material UI form control
import { makeStyles } from "@material-ui/core/styles";
import styled, {keyframes} from "styled-components";

import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

// Custom components
import Button from "../Buttons/FormButton";
import DisabledButton from "../Buttons/DisabledButton";
import FilledButton from "../Buttons/FilledButton";
import RegisterButton from '../Buttons/RegisterButton';
import GdprDialog from "../Texts/Gdpr";
import LinkButton from "../Buttons/LinkButton";
import ErrorMessage from "../Alerts/ErrorMessage";
import Title from "../Texts/Title";
import Checkbox from "../Forms/Checkbox";

// Dynamic content
import BranchSpecificContent from "../DynamicContent/BranchSpecificContent";

// Animations
import {motion} from 'framer-motion';

//Form
import { NewFormInput } from "../Forms/NewFormInput";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    position: "relative",
    justifyContent: "center",
  },
}));

const MyDialog = styled(Dialog)`
  background: black;
`;

const MyDialogContent = styled(DialogContent)`
  background: ${(props) => props.theme.colors.blackWhite};
`;

const GdprContainer = styled.div`
  margin-left: 2%;
`;

const GdprGrid = styled(Grid)`
  margin-bottom: 6%;
  font-family: Roboto;
  font-size: 0.8rem;
`


const FormTitle = styled.div`
  margin-top: 5%;
  margin-bottom: 1%;
  margin-left: 2%;
  color: #828282;
  font-family: Roboto;
  font-weight: 400;
  font-size: 1rem;
  @media screen and (max-width: 700px) {
    font-size: 0.8rem;
     }
`;



export default function RegistrationFormExisting({ password, email }) {
  const { t } = useTranslation();
  const classes = useStyles();
  const [error, setError] = useState(false);
  const { setIsAuth } = useContext(UserContext);
  const [donorCode, updateDonorCode] = useFormState("");
  const [donorError, setDonorError] = useState(false)
  const [formEmail, updateFormEmail] = useFormState(email);
  const [emailError, setEmailError] = useState(false)
  const [formPassword, updateFormPassword] = useFormState(password);
  const [passwordError, setPasswordError] = useState(false)
  const [repeatedPassword, updateRepeatedPassword] = useFormState("");
  const [repeatedPasswordError, setRepeatedPasswordError] = useState(false)
  const [branch, setBranch] = useState(null);


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

  const validateAndSubmit = () => {
    // Validate required fields
    if (error == null) {
      onSubmit();
      clearErrors()
    }
     else {
      
    }
  };


  const validateDonor = () => {
    if (donorCode == "") {
      setError(true)
      setDonorError(true);
    }     else {
      setDonorError(false);
    }
  }

  const validateEmail = () => {
    if (formEmail == "") {
      setError(true)
      setEmailError(true);
    }     else {
      setEmailError(false);
    }
  }

  const validatePassword = () => {
    if (formPassword == "") {
      setError(true);
      setPasswordError(true)
    } else {
      setPasswordError(false)
    }
  }

  const validateRepeatedPassword = () => {
    if (repeatedPassword == "") {
      setError(true);
      setRepeatedPasswordError(true)
    }  else if (repeatedPassword != formPassword) {
      setRepeatedPasswordError(true)
    } else {
      setRepeatedPasswordError(false)
    }
  }

  const clearErrors = () => {
    setDonorError(false)
    setEmailError(false)
    setError(false)
    setPasswordError(false)
    setRepeatedPasswordError(false)
  }

  // Form submit function
  const onSubmit = async () => {
    clearErrors();
    try {
      const res = await axios({
        method: "post",
        url: process.env.REACT_APP_API_URL+"RegisterExistingUser",
        data: {
          Username: formEmail,
          Password: formPassword,
          DonorCode: donorCode,
          DefaultSubcenterId: branch,
        },
      });
      console.log(res.data);
      // Reset error message
      localStorage.setItem("defaultSubcenter", branch);
      // Go to login mode
      setIsAuth(true);
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

      <Grid container spacing={0}>
        <form>

          <FormTitle>
            Donations are needed more than ever - especially for treating
            patients vulnerable to COVID-19. Donations are needed more than ever
            .
          </FormTitle>
               {/* Error message if state true */}
           <Grid item xs={12} lg={12}>
             {error ? 
                     <motion.div className="title"
                     initial={{ y: -250}}
                     animate={{ y: -10 }}
                     transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
                   >
                       <ErrorMessage title={"Please check and correct highlighted inputs"} />
                   </motion.div>
            : null}
           </Grid>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Title title={t("form_title_personal")} />{" "}
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3}>
              <NewFormInput
                id="donorCode"
                type="string"
                value={donorCode}
                name="donorCode"
                placeholder="123456"
                label={t("form_donorCode")}
                onChange={updateDonorCode}
                error={donorError}
                onBlur={() => validateDonor()}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3}>
              <NewFormInput
                error={emailError}
                id="formEmail"
                type="text"
                value={formEmail}
                name="formEmail"
                label="Email"
                placeholder="myplasma@email.com"
                onChange={updateFormEmail}
                onBlur={() => validateEmail()}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Title title={t("form_password")} />{" "}
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3}>
              <NewFormInput
                error={passwordError}
                id="formPassword"
                type="password"
                value={formPassword}
                name="formPassword"
                label={t("form_password")}
                placeholder={"****"}
                onChange={updateFormPassword}
                onBlur={() => validatePassword()}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3}>
              <NewFormInput
                 error={repeatedPasswordError}
                id="repeatedPassword"
                type="password"
                value={repeatedPassword}
                name="repeatedPassword"
                placeholder={"****"}
                label={t("form_repeatPassword")}
                onChange={updateRepeatedPassword}
                onBlur={() => validateRepeatedPassword()}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Title title={t("form_title_location")} />{" "}
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <BranchSpecificContent branch={branch} />
            </Grid>
          </Grid>
        </form>
        {/* GDPR checkbox and form */}
        <GdprContainer>
          <GdprGrid item xs={12} sm={12} md={12} lg={12}>
            <Checkbox checked={checked} onChange={handleCheck} label={"ahoj"}>
            {t("gdprAgreePre")}<LinkButton label={t("gdprAgree")} onClick={handleOpenGdpr} />
            </Checkbox>
          </GdprGrid>
          {checked === true ? (
            <FilledButton
              color={"#FA6966"}
              onClick={validateAndSubmit}
              label={t("register")}
            />
          ) : (
            <DisabledButton color={"#F34B5B"} label={t("register")} />
          )}
        </GdprContainer>
      </Grid>
      <div>
        {/* Gdpr dialog */}
        <MyDialog open={openGdpr} onClose={handleCloseGdpr} maxWidth={"lg"}>
          <MyDialogContent>
            <DialogTitle>GDPR</DialogTitle>
            <GdprDialog branch={branch} />
            <DialogActions>
              <Button onClick={handleCloseGdpr} label={t("close")} />
            </DialogActions>
          </MyDialogContent>
        </MyDialog>
      </div>
    </div>
  );
}
