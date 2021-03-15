import React, { useState, useContext } from "react";
import { UserContext } from "../Utils/UserContext";
import useFormState from "../../hooks/useFormState";
import axios from "axios";
import { useTranslation } from "react-i18next";
// Material UI form control
import styled from "styled-components";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";

// Custom components
import Button from "../Buttons/FormButton";
import DisabledButton from "../Buttons/DisabledButton";
import FilledButton from "../Buttons/FilledButton";
import GdprDialog from "../Texts/Gdpr";
import LinkButton from "../Buttons/LinkButton";
import ErrorMessage from "../Texts/ErrorMessage";
import Title from "../Texts/Title";
import Checkbox from "../Forms/Checkbox";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { NewFormInput } from "../Forms/NewFormInput";
import { FormInputYup } from "../Forms/FormInputYup";
import { FormLabel } from "../Forms/FormLabel";

import { yupResolver } from "@hookform/resolvers/yup";

// Alert
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

// Dynamic content
import BranchSpecificContent from "../DynamicContent/BranchSpecificContent";

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
`;

const FormTitle = styled.div`
  margin-top: 2%;
  margin-left: 5%;
  color: #828282;
  font-family: Roboto;
  font-size: 1rem;
  @media screen and (max-width: 700px) {
    font-size: 0.9rem;
  }
`;

const InputGrid = styled(Grid)`
  margin-top: 1%;
`;
const schema = yup.object().shape({
  donorFirstName: yup.string().required("Required"),
  // donorLastName: yup.string()
  //   .min(3, "Password should be longer than 3 characters")
  //   .max(20, "Max exceeded")
  //   .required("Required"),
  // formEmail: yup.string().max(50, "Max exceeded").required(),
  // birthdate: yup.string().max(20, "Max exceeded").required(),
  // pin: yup.string().max(20, "Max exceeded").required(),
  // phone: yup.string().max(20, "Max exceeded").required(),
  // formPassword: yup.string().max(20, "Max exceeded").required(),
  // repeatedPassword: yup.string().max(20, "Max exceeded").required(),
});

export default function RegistrationFormNew({ branch, email, password }) {
  const { t } = useTranslation();
  const { setIsAuth } = useContext(UserContext);

  //Loading
  const [isLoading, setLoading] = useState(false);

  // Form states
  const [donorFirstName, updateFirstName] = useFormState(null);
  const [donorSurname, updateSurname] = useFormState(null);
  const [birthdate, updateBirthdate] = useFormState("");
  const [pin, updatePin] = useFormState("");
  const [formEmail, updateFormEmail] = useFormState(email);
  const [phone, updatePhone] = useFormState("");
  const [formPassword, updateFormPassword] = useFormState(password);
  const [repeatedPassword, updateRepeatedPassword] = useFormState("");

  // Form validations
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  // Alert dialog
  const [validationNameAlert, setValidationNameAlert] = useState(false);
  const [alertError, setAlertError] = useState(null);
  const alertOpen = () => {
    setValidationNameAlert(true);
    setAlertError();
  };
  const alertClose = () => {
    setValidationNameAlert(false);
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

  const validateAndSubmit = () => {
    // Validate required fields
    if (donorFirstName == null) {
      setAlertError("Name required");
    }
    // Validate required surname
    else if (donorSurname == null) {
      alertOpen();
    } else {
      onSubmit();
    }
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
      setAlertError(null);
      localStorage.setItem("defaultSubcenter", branch);
      setIsAuth(true);
    } catch (err) {
      // Error 😨
      if (err.response) {
        // client received an error response (5xx, 4xx)
        console.log(err.response);
        setAlertError(err.request);
        setLoading(false);
      } else if (err.request) {
        setAlertError(err.request);
        // client never received a response, or request never left
        console.log(err.request);
        setLoading(false);
      } else {
        // anything else
      }
      setAlertError(err.request);
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Error message if state true */}
      {errors.donorFirstName && <div>{errors.donorFirstName.message}</div>}
      {alertError ? <ErrorMessage title={alertError} /> : null}
      <Grid container spacing={0}>
        <form>
          <Grid container spacing={0}>
            <FormTitle>
              Donations are needed more than ever - especially for treating
              patients vulnerable to COVID-19. Donations are needed more than
              ever .
            </FormTitle>
            {/* First name */}
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Title title={t("form_title_personal")} />{" "}
            </Grid>
            <InputGrid item xs={12} sm={6} md={6} lg={4}>
              <NewFormInput
                ref={register}
                id="donorFirstName"
                type="text"
                value={donorFirstName}
                name="donorFirstName"
                placeholder="John"
                label={t("form_name")}
                onChange={updateFirstName}
              />
            </InputGrid>{" "}
            <InputGrid item xs={12} sm={6} md={6} lg={4}>
              <FormLabel id="firstName" label={t("form_name")} />
              <FormInputYup
                ref={register({ required: true, maxLength: 50 })}
                id="donorFirstName"
                type="text"
                value={donorFirstName}
                name="donorFirstName"
                placeholder="John"
                onChange={updateFirstName}
              />{" "}
            </InputGrid>
            {/* Last name */}
            <InputGrid item xs={12} sm={6} md={6} lg={4}>
              <NewFormInput
                id="donorSurname"
                type="text"
                value={donorSurname}
                name="donorSurname"
                label={t("form_surname")}
                placeholder="Smith"
                onChange={updateSurname}
                ref={register}
                // error={errors.formEmail}
              />
            </InputGrid>
            {/* Birthdate/Personal identificator based on chose country */}
            <InputGrid item xs={12} sm={6} md={6} lg={4}>
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
            </InputGrid>
            <InputGrid item xs={12} sm={6} md={6} lg={4}>
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
            </InputGrid>
            <InputGrid item xs={12} sm={6} md={6} lg={4}>
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
            </InputGrid>
            {/* Phone number*/}
            <InputGrid item xs={12} sm={6} md={6} lg={4}>
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
            </InputGrid>
            {/* Password */}
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Title title={t("form_password")} />{" "}
            </Grid>
            <InputGrid item xs={12} sm={6} md={6} lg={4}>
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
            </InputGrid>
            {/* Repeat password */}
            <InputGrid item xs={12} sm={6} md={6} lg={4}>
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
            </InputGrid>
          </Grid>
        </form>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Title title={t("form_title_location")} />{" "}
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <BranchSpecificContent branch={branch} />
        </Grid>
        {/* GDPR checkbox */}
        <GdprContainer>
          <GdprGrid item xs={12} sm={12} md={12} lg={12}>
            <Checkbox checked={checked} onChange={handleCheck} label={"ahoj"}>
              {" "}
              {t("gdprAgreePre")}
              <LinkButton label={t("gdprAgree")} onClick={handleOpenGdpr} />
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
      </Grid>
      {/* Alerts */}
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={validationNameAlert}
        autoHideDuration={3000}
        onClose={alertClose}
      >
        <MuiAlert severity="error">{alertError}</MuiAlert>
      </Snackbar>
    </div>
  );
}
