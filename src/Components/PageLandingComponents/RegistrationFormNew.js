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
import Grid from "@material-ui/core/Grid";

import Button from "../Buttons/FormButton";
import Loader from "react-spinners/BounceLoader";
import FormInput from "../Forms/FormInput";
import FormInputLabel from "../Forms/FormInputLabel";
import MyCheckbox from "../Buttons/Checkbox";
import GdprDialog from "../Texts/Gdpr";
import LinkButton from "../Buttons/LinkButton";
import ErrorMessage from "../Texts/ErrorMessage";

import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { NewFormInput } from "../Forms/NewFormInput";

import { useTranslation } from "react-i18next";
import Countries from "../../enums/Countries";

import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

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
  dialogValuesContainer: {
    padding: "1rem",
    maxWidth: "100%",
  },
  dialogWarning: {
    paddingLeft: "4%",
  },
  formP: {
    paddingBottom: "0.6rem",
  },
  loader: {
    position: "absolute",
  },
}));

const MyDialog = styled(Dialog)`
  background: black;
`;

const MyDialogContent = styled(DialogContent)`
  background: ${(props) => props.theme.colors.blackWhite};
`;
const MySelect = styled(Select)`
  margin: 0.3rem;
  color: ${(props) => props.theme.colors.text};
  position: relative;
  padding: 0.2rem;
  font-weight: bold;
  font-size: 0.8rem;
  text-align: center;
  border-radius: 0.5em;
  cursor: pointer;
  outline: none;
  border: none;
  border-bottom: 0.1px solid ${(props) => props.theme.colors.borderColor};
  min-width: 220px;
  transition-duration: 0.4s;
  &:hover {
    background-color: ${(props) => props.theme.colors.main};
    border: none;
  }
`;

const MyMenuItem = styled(MenuItem)`
  background-color: ${(props) => props.theme.colors.input};
  color: ${(props) => props.theme.colors.text};
  font-size: 0.8rem;

  &:hover {
    background-color: ${(props) => props.theme.colors.inputOption};
  }
  &:focus {
    background-color: ${(props) => props.theme.colors.inputOption};
    &:hover {
      background-color: ${(props) => props.theme.colors.inputOption};
    }
  }
`;

export default function RegistrationFormNew({ branch, email, password }) {
  const classes = useStyles();
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  const { setIsAuth } = useContext(UserContext);

  //Loading
  const [isLoading, setLoading] = useState(false);

  // Form states
  const [donorFirstName, updateFirstName] = useFormState("");
  const [donorSurname, updateSurname] = useFormState("");
  const [birthdate, updateBirthdate] = useFormState("");
  const [pin, updatePin] = useFormState("");
  const [country, setCountry] = useState("");
  const [formEmail, updateFormEmail] = useFormState(email);
  const [phone, updatePhone] = useFormState("");
  const [formPassword, updateFormPassword] = useFormState(password);
  const [repeatedPassword, updateRepeatedPassword] = useFormState("");

  // Form validations
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    validationSchema: Yup.object({
      donorFirstName: Yup.string()
        .min(3, "Password should be longer than 3 characters")
        .max(20, "Max exceeded")
        .required("Required"),
      donorLastName: Yup.string()
        .min(3, "Password should be longer than 3 characters")
        .max(20, "Max exceeded")
        .required("Required"),
      formEmail: Yup.string().max(50, "Max exceeded").required(),
      birthdate: Yup.string().max(20, "Max exceeded").required(),
      pin: Yup.string().max(20, "Max exceeded").required(),
      phone: Yup.string().max(20, "Max exceeded").required(),
      formPassword: Yup.string().max(20, "Max exceeded").required(),
      repeatedPassword: Yup.string().max(20, "Max exceeded").required(),
    }),
  });

  // Country selection functions
  const [openCountries, setOpenCountries] = useState(false);
  const handleOpenCountries = () => {
    setOpenCountries(true);
  };
  const handleCloseCountries = () => {
    setOpenCountries(false);
  };
  const handleChangeCountry = (event) => {
    setCountry(event.target.value);
  };

  // Gdpr
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

  const onSubmit = async (e) => {
    setLoading(true);
    try {
      const res = await axios({
        method: "post",
        url: "https://virtserver.swaggerhub.com/xkazm04/User/1.0.0/register",
        data: {
          Username: formEmail,
          Password: formPassword,
          FirstName: donorFirstName,
          LastName: donorSurname,
          PersonalIdentificationNumber: birthdate,
          DefaultSubcenterId: branch,
        },
      });
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      // Reset error message
      setError(null);
      localStorage.setItem("defaultSubcenter", branch);
      setIsAuth(true);
    } catch (err) {
      // Error 😨
      if (err.response) {
        // client received an error response (5xx, 4xx)
        console.log(err.response);
        setError(err.request);
        setLoading(false);
      } else if (err.request) {
        setError(err.request);
        // client never received a response, or request never left
        console.log(err.request);
        setLoading(false);
      } else {
        // anything else
      }
      setError(err.request);
      setLoading(false);
    }
  };

  return (
    <div className={classes.container}>
      {isLoading ? (
        <Loader size={10} color={"#f54275"} loading={isLoading} />
      ) : (
        <div className={classes.formContainer}>
          <div>
            {/* Error message if state true */}
            {error ? <ErrorMessage title={error} /> : null}

            <Grid container spacing={1}>
              {/* First name */}
              <Grid item xs={12} sm={12} md={5} lg={5}>
                <NewFormInput
                  id="firstName"
                  type="text"
                  value={donorFirstName}
                  name="firstName"
                  placeholder="John"
                  label={t("form_name")}
                  onChange={updateFirstName}
                  ref={register}
                  error={errors.donorFirstName}
                />
              </Grid>
              {/* Last name */}
              <Grid item xs={12} sm={12} md={5} lg={5}>
                <NewFormInput
                  id="donorSurname"
                  type="text"
                  value={donorSurname}
                  name="donorSurname"
                  label={t("form_surname")}
                  placeholder="Smith"
                  onChange={updateSurname}
                  ref={register}
                  error={errors.formEmail}
                />
              </Grid>
              {/* Country select */}
              {/* <Grid item xs={12} sm={12} md={5} lg={5}>
              <FormInputLabel label={t("form_country")} />
              <MySelect
                open={openCountries}
                onChange={handleChangeCountry}
                onOpen={handleOpenCountries}
                onClose={handleCloseCountries}
                defaultValue={t("chooseCountrySelect")}
              >
                <MyMenuItem value={null}>
                  {" "}
                  <em>{t("chooseCountrySelect")}</em>
                </MyMenuItem>
                {Countries.map((c) => (
                  <MyMenuItem value={c.id}>{c.countryRk}</MyMenuItem>
                ))}
              </MySelect>
              </Grid> */}
              
              {/* Birthdate/Personal identificator based on chose country */}

               <Grid item xs={12} sm={12} md={5} lg={5}>
                  <NewFormInput
                    id="birthdate"
                    type="text"
                    value={birthdate}
                    name="birthdate"
                    label={t("form_birthdate")}
                    placeholder="10-05-1965"
                    onChange={updateBirthdate}
                    ref={register}
                    error={errors.birthdate}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={5} lg={5}>
                  <NewFormInput
                    id="pin"
                    type="text"
                    value={pin}
                    name="pin"
                    label={t("form_pin")}
                    placeholder="123456789"
                    onChange={updatePin}
                    ref={register}
                    error={errors.pin}
                  />
                </Grid>
              
              <Grid item xs={12} sm={12} md={5} lg={5}>
                <NewFormInput
                  id="formEmail"
                  type="text"
                  value={formEmail}
                  name="formEmail"
                  label="Email"
                  placeholder="myplasma@email.com"
                  onChange={updateFormEmail}
                  ref={register}
                  error={errors.formEmail}
                />
              </Grid>
              {/* Phone number*/}
              <Grid item xs={12} sm={12} md={5} lg={5}>
                <NewFormInput
                  id="phone"
                  type="text"
                  value={phone}
                  name="phone"
                  label={t("form_phone")}
                  placeholder="+123900900900"
                  onChange={updatePhone}
                  ref={register}
                  error={errors.phone}
                />
              </Grid>

              {/* Password */}
              <Grid item xs={12} sm={12} md={5} lg={5}>
                <NewFormInput
                  id="formPassword"
                  type="password"
                  value={formPassword}
                  name="formPassword"
                  label={t("form_password")}
                  placeholder={"****"}
                  onChange={updateFormPassword}
                  ref={register}
                  error={errors.formPassword}
                />
              </Grid>
              {/* Repeat password */}
              <Grid item xs={12} sm={12} md={5} lg={5}>
                <NewFormInput
                  id="repeatedPassword"
                  type="password"
                  value={repeatedPassword}
                  name="repeatedPassword"
                  placeholder={"****"}
                  label={t("form_repeatPassword")}
                  onChange={updateRepeatedPassword}
                  ref={register}
                  error={errors.formPassword}
                />
              </Grid>
            </Grid>

          </div>

          <div>
            <div className={classes.formInputRow}>
              {/* GDPR */}
              <div className={classes.gdpr}>
                <MyCheckbox checked={checked} onChange={handleCheck} />
                <LinkButton label={t("gdprAgree")} onClick={handleOpenGdpr} />
              </div>
            </div>
            {checked === true ? (
              <Button onClick={handleSubmit(onSubmit)} label={t("register")} />
            ) : null}
          </div>

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
      )}
    </div>
  );
}
