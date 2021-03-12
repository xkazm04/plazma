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
import Checkbox from '../Forms/Checkbox';
import Loader from "react-spinners/BounceLoader";

import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { NewFormInput } from "../Forms/NewFormInput";

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
`;

const FormTitle = styled.div`
  margin-top: 2%;
  margin-left: 5%;
  color: #828282;
  font-family: Roboto;
  font-size: 1rem;
`;


const InputGrid = styled(Grid)`
  margin-top: 1%;
`

export default function RegistrationFormNew({ branch, email, password }) {
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
    <div>
            {/* Error message if state true */}
            {error ? <ErrorMessage title={error} /> : null}
            <Grid container spacing={0}>
            <form>
            <Grid container spacing={0}>
        <FormTitle>
              Donations are needed more than ever - especially for treating patients vulnerable to COVID-19. Donations are needed more than ever .</FormTitle>
              {/* First name */}
              <Grid item xs={12} sm={12} md={12} lg={12}>
              <Title title={t("form_title_personal")} />{" "}
            </Grid>
              <InputGrid item xs={12} sm={12} md={4} lg={4}>
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
              </InputGrid>
              {/* Last name */}
              <InputGrid item xs={12} sm={12} md={4} lg={4}>
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
              </InputGrid>
              
              {/* Birthdate/Personal identificator based on chose country */}

               <InputGrid item xs={12} sm={12} md={4} lg={4}>
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

                <InputGrid item xs={12} sm={12} md={5} lg={4}>
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
              
              <InputGrid item xs={12} sm={12} md={4} lg={4}>
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
              <InputGrid item xs={12} sm={12} md={4} lg={4}>
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
              <InputGrid item xs={12} sm={12} md={5} lg={5}>
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
              <InputGrid item xs={12} sm={12} md={5} lg={5}>
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
          <BranchSpecificContent branch={branch}/>
          </Grid>
          {/* GDPR checkbox */}
          <GdprContainer>          
            <GdprGrid item xs={12} sm={12} md={12} lg={12}>
          <Checkbox checked={checked} onChange={handleCheck} label={"ahoj"}><LinkButton label={t("gdprAgree")} onClick={handleOpenGdpr} /></Checkbox>
          </GdprGrid>

          {checked === true ? (
            <FilledButton color={"#FA6966"} onClick={handleSubmit(onSubmit)} label={t("register")} />
          ) :  <DisabledButton color={"#F34B5B"} label={t("register")} />}
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
    </div>
  );
}
