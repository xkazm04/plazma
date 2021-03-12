// create.component.js

import React, { useState, useContext } from "react";
import { UserContext } from "../Utils/UserContext";
import useFormState from "../../hooks/useFormState";
import axios from "axios";
// Material UI form control
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";

import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

// Custom components
import Button from "../Buttons/FormButton";
import DisabledButton from "../Buttons/DisabledButton";
import FilledButton from "../Buttons/FilledButton";
import GdprDialog from "../Texts/Gdpr";
import LinkButton from "../Buttons/LinkButton";
import ErrorMessage from "../Texts/ErrorMessage";
import Title from "../Texts/Title";
import Checkbox from "../Forms/Checkbox";

// Dynamic content
import BranchSpecificContent from "../DynamicContent/BranchSpecificContent";

//Form
import { useForm } from "react-hook-form";
import * as Yup from "yup";
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
`

const FormTitle = styled.div`
  margin-top: 2%;
  margin-left: 5%;
  color: #828282;
  font-family: Roboto;
  font-size: 1rem;
`;

export default function RegistrationFormExisting({ password, email }) {
  const { t } = useTranslation();
  const classes = useStyles();
  const [error, setError] = useState(null);
  const { setIsAuth } = useContext(UserContext);
  const [donorCode, updateDonorCode] = useFormState(null);
  const [formEmail, updateFormEmail] = useFormState(email);
  const [formPassword, updateFormPassword] = useFormState(password);
  const [repeatedPassword, updateRepeatedPassword] = useFormState("");
  const [branch, setBranch] = useState(null);

  // Form validations
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    validationSchema: Yup.object({
      formPassword: Yup.string()
        .min(3, "Password should be longer than 3 characters")
        .max(20, "Max exceeded")
        .required("Required"),
      repeatedPassword: Yup.string()
        .min(3, "Password should be longer than 3 characters")
        .max(20, "Max exceeded")
        .required("Required"),
      formEmail: Yup.string().max(50, "Max exceeded").required(),
      donorCode: Yup.string().max(20, "Max exceeded").required(),
    }),
  });

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
        method: "post",
        url: "https://virtserver.swaggerhub.com/xkazm04/User/1.0.0/register",
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
      setError(null);
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
      setError(err);
    }
  };

  return (
    <div className={classes.container}>
      {/* Error message if state true */}
      {error ? <ErrorMessage title={error} /> : null}
      <Grid container spacing={0}>
        <form>
          <FormTitle>
            Donations are needed more than ever - especially for treating
            patients vulnerable to COVID-19. Donations are needed more than ever
            .
          </FormTitle>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Title title={t("form_title_personal")} />{" "}
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <NewFormInput
                id="donorCode"
                type="string"
                value={donorCode}
                name="donorCode"
                placeholder="123456"
                label={t("form_donorCode")}
                onChange={updateDonorCode}
                ref={register}
                error={errors.donorCode}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3}>
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
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Title title={t("form_password")} />{" "}
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3}>
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
            <Grid item xs={12} sm={12} md={3} lg={3}>
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
              <LinkButton label={t("gdprAgree")} onClick={handleOpenGdpr} />
            </Checkbox>
          </GdprGrid>
          {checked === true ? (
            <FilledButton
              color={"#FA6966"}
              onClick={onSubmit}
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
