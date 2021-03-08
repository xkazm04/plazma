
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
import Loader from 'react-spinners/BounceLoader'
import FormInput from "../Forms/FormInput";
import FormInputLabel from "../Forms/FormInputLabel";
import MyCheckbox from "../Buttons/Checkbox";
import GdprDialog from "../Texts/Gdpr";
import LinkButton from "../Buttons/LinkButton";
import ErrorMessage from "../Texts/ErrorMessage";

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
  border-bottom: 0.1px solid ${props => props.theme.colors.borderColor};
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
      setTimeout(()=> {
        setLoading(false)
      },2000)
      // Reset error message
      setError(null);
      localStorage.setItem('defaultSubcenter', branch)
      setIsAuth(true);
    } catch (err) {
      // Error 😨
      if (err.response) {
        // client received an error response (5xx, 4xx)
        console.log(err.response);
        setError(err.request)
        setLoading(false);
      } else if (err.request) {
        setError(err.request)
        // client never received a response, or request never left
        console.log(err.request);
        setLoading(false);
      } else {
        // anything else
      }
      setError(err.request)
      setLoading(false);
      
    }
  };

  return (
    <div className={classes.container}>
      {isLoading ? <Loader size={10} color={"#f54275"} loading={isLoading} /> : 
      <div className={classes.formContainer}>
        <div>
          {/* Error message if state true */}
          {error ? <ErrorMessage title={error} /> : null}

          {/* Register form */}
          <div className={classes.formInputRow}>
            {/* First name input */}
            <div className={classes.inputItem}>
              <FormInputLabel label={t("form_name")} />
              <FormInput
                onChange={updateFirstName}
                placeholder={"Mirek"}
                type={"text"}
                width="200px"
                smallerWidth="20vw"
              />
            </div>
            {/* Surname input  */}
            <div className={classes.inputItem}>
              <FormInputLabel label={t("form_surname")} />
              <FormInput
                onChange={updateSurname}
                placeholder={"Dušín"}
                type={"text"}
                width="200px"
                smallerWidth="20vw"
              />
            </div>
            {/* Country input  */}
            <div className={classes.inputItem}>
              {/* Country select */}
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
            </div>
            <div></div>
          </div>
          <div>
            {/* Email input */}
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
                />
              </div>

              {/* Based on selected country show PIN or BirthDate */}
              {country == 1 ? (
                <div className={classes.inputItem}>
                <FormInputLabel label={t("form_pin")} />
                <FormInput
                  onChange={updatePin}
                  placeholder={"8010123289"}
                  type={"text"}
                  width="200px"
                  smallerWidth="20vw"
                />
              </div>
              ) : (
                <div className={classes.inputItem}>
                <FormInputLabel label={t("form_birthdate")} />
                <FormInput
                  onChange={updateBirthdate}
                  placeholder={"02-10-1998"}
                  type={"text"}
                  width="200px"
                  smallerWidth="20vw"
                />
              </div>

              )}

              {/* Phone number input */}
              <div className={classes.inputItem}>
                <FormInputLabel label={t("form_phoneNumber")} />
                { country == 1 ?                 
                <FormInput
                  onChange={updatePhone}
                  width="200px"
                  smallerWidth="30vw"
                  placeholder={"+420123456789"}
                  type={"text"}
                /> :                
               <FormInput
                onChange={updatePhone}
                width="200px"
                smallerWidth="30vw"
                placeholder={"+12 3456789"}
                type={"text"}
              /> }

              </div>
            </div>
          </div>
          <div>
            <div className={classes.formInputRow}>
              {/* Password input */}
              <div className={classes.inputItem}>
                <FormInputLabel label={t("form_password")} />
                <FormInput
                  value={formPassword}
                  onChange={updateFormPassword}
                  placeholder={"****"}
                  type={"password"}
                  width="200px"
                  smallerWidth="30vw"
                />
              </div>

              <div className={classes.inputItem}>
                <FormInputLabel label={t("form_repeatPassword")} />
                <FormInput
                  onChange={updateRepeatedPassword}
                  placeholder={"****"}
                  type={"password"}
                  width="200px"
                  smallerWidth="30vw"
                />
              </div>
            </div>
            {/* GDPR */}
            <div className={classes.gdpr}>
              <MyCheckbox checked={checked} onChange={handleCheck} />
              <LinkButton label={t("gdprAgree")} onClick={handleOpenGdpr} />
            </div>
          </div>
          {checked === true ? (
            <Button onClick={onSubmit} label={t("register")} />
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
      }
    </div>
  );
}
