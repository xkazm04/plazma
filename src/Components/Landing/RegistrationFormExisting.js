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
import MyCheckbox from "../Buttons/Checkbox";
import GdprDialog from "../Texts/Gdpr";
import LinkButton from "../Buttons/LinkButton";
import ErrorMessage from "../Texts/ErrorMessage";

import Grid from "@material-ui/core/Grid";

//Form
import {useForm} from 'react-hook-form'
import * as Yup from 'yup'
import { NewFormInput } from "../Forms/NewFormInput";

import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    position: "relative",
    justifyContent: "center",
  },
  gdpr: {
    display: "flex",
    marginBottom: "2vh",
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

const FinalPartDiv = styled.div`
  margin-left: 5%;
  margin-top: 5%;
`


export default function RegistrationFormExisting({ branch, password, email }) {
  const { t } = useTranslation();
  const classes = useStyles();
  const [error, setError] = useState(null);
  const { setIsAuth } = useContext(UserContext);
  const [donorCode, updateDonorCode] = useFormState(null);
  const [formEmail, updateFormEmail] = useFormState(email);
  const [formPassword, updateFormPassword] = useFormState(password);
  const [repeatedPassword, updateRepeatedPassword] = useFormState("");


  // Form validations
  const {register, handleSubmit, errors} = useForm({
    mode: 'onBlur',
    validationSchema: Yup.object({
      formPassword: Yup.string().min(3, 'Password should be longer than 3 characters').max(20, 'Max exceeded').required('Required'),
      repeatedPassword: Yup.string().min(3, 'Password should be longer than 3 characters').max(20, 'Max exceeded').required('Required'),
      formEmail: Yup.string().max(50, 'Max exceeded').required(),
      donorCode: Yup.string().max(20, 'Max exceeded').required(),
    }),
  })


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
                    {/* Error message if state true */}
      {error ? <ErrorMessage title={error} /> : null}
        <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={5} lg={5}>
      <NewFormInput         id="donorCode"
        type="string"
        value={donorCode}
        name="donorCode"
        placeholder="123456"
        label={t("form_donorCode")}
        onChange={updateDonorCode}
        ref={register}
        error={errors.donorCode}/>
        </Grid>
       
        <Grid item xs={12} sm={12} md={5} lg={5}>
      <NewFormInput         id="formEmail"
        type="text"
        value={formEmail}
        name="formEmail"
        label="Email"
        placeholder="myplasma@email.com"
        onChange={updateFormEmail}
        ref={register}
        error={errors.formEmail}/>
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={5}>
      <NewFormInput         id="formPassword"
        type="password"
        value={formPassword}
        name="formPassword"
        label={t("form_password")}
        placeholder={"****"}
        onChange={updateFormPassword}
        ref={register}
        error={errors.formPassword}/>
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={5}>
      <NewFormInput         id="repeatedPassword"
        type="password"
        value={repeatedPassword}
        name="repeatedPassword"
        placeholder={"****"}
        label={t("form_repeatPassword")}
        onChange={updateRepeatedPassword}
        ref={register}
        error={errors.formPassword}/>
        </Grid>
        </Grid>
    {/* GDPR checkbox */}
    <FinalPartDiv>
      <Grid container spascing={0}>
    <Grid item xs={1} sm={1} md={1} lg={1}>
        <MyCheckbox checked={checked} onChange={handleCheck} /> </Grid>
        <Grid item xs={11} sm={11} md={11} lg={11}>
          <LinkButton
            label={t('gdprAgree')}
            onClick={handleOpenGdpr}
          />
         
            </Grid>
            </Grid>
           {checked === true ? (
              <Button onClick={handleSubmit(onSubmit)} label={t('register')}  />
            ) : null}
            </FinalPartDiv>
          
        
    </form>
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
          </div>
        </div>
      </div>
    </div>
  );
}
