// create.component.js

import React, { useState, useContext } from "react";
import { UserContext } from "../../Utils/UserContext";
import useFormState from "../../../hooks/useFormState";
import axios from "axios";
// Material UI form control
import styled from "styled-components";

import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

// Custom components
import Button from "../../Buttons/FormButton";
import DisabledButton from "../../Buttons/DisabledButton";
import FilledButton from "../../Buttons/FilledButton";
import LinkButton from "../../Buttons/LinkButton";
import {ErrorMessage} from '../../Alerts/Alerts';
import Title from "../../Texts/Title";
import Checkbox from "../../Forms/Checkbox";
// Dynamic content
import BranchSpecificContent from "../../DynamicContent/BranchSpecificContent";
import GdprContent from "../../DynamicContent/GdprContent";
import { BranchContext } from "../../Utils/BranchContext";

//Form
import { useTranslation } from "react-i18next";
// Form utilities
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Animations
import AlertAnimation from '../../Animations/AlertAnimation'


const Kontejner = styled.div`
      display: flex;
    position: relative;
    justify-content: center;
`

const MyDialog = styled(Dialog)`
  background: black;
`;

const MyDialogContent = styled(DialogContent)`
  background: ${(props) => props.theme.colors.blackWhite};
`;

const GdprContainer = styled.div`
  margin-left: 1%;
`;

const GdprGrid = styled(Grid)`
  margin-bottom: 6%;
  font-family: Roboto;
  font-size: 0.8rem;
`

const FormTitle = styled.div`
  margin-top: 2%;
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

const StyledInput = styled.input` 
    margin-left: 5%;
    font-size: ${props => props.theme.fonts.p};
    outline: none;
    background-color: ${props => props.theme.Primitive.Shade};
    color: ${props => props.theme.colors.text};
    position: relative;
    padding: .7rem;
    font-family: Roboto;
    font-size: 1rem;
    border: none;
    border: ${prop => prop.error ? '1px solid #98000E' : 'none'};
    text-align: 'left';
    transition-duration: 0.4s;
    margin-bottom: 0.3rem;
    width: ${props => props.width || '85%'};
    &:hover{
        background-color: ${props => props.theme.colors.main};
        transition-duration: 0.4s;
        border-radius: 10px;
    }
    &:focus{
        background-color: ${props => props.theme.colors.main};
        transition-duration: 0.4s;
        border-radius: 10px;
    }
    &::placeholder {
        font-size: 1rem;
        color: ${props => props.theme.colors.text};
        opacity: 0.5;
      @media screen and (max-width: 700px) {
     font-size: 0.7rem;
     }
  }
  @media screen and (max-width: 700px) {
     font-size: 0.7rem;
     width: ${props => props.smallerWidth || '90%'};
     margin-top: 2%;
     margin-bottom: 2%;
     margin-left: 0%;
     }
`

const StyledLabel = styled.label`
    font-size: 0.9rem;
    margin-left: 5%;   
    position: relative;
    font-family: Roboto;
    font-weight: 400;
    padding-top: 2%;
    color: ${prop => prop.error ? '#98000E': '#858795'};
    @media screen and (max-width: 700px) {
      margin-left: 0%;   
     }
`

export default function RegistrationFormExisting({ password, email }) {
  const { t } = useTranslation();
  const schema = yup.object().shape({
    formEmail: yup.string().max(50, t("form_val_email_max")).email(t("form_val_email_format")).required(t("form_val_email_required")),
    donorCode: yup.string().required(t("form_val_donorCode_required")),
    formPassword: yup.string().min(4, t("form_val_pass_min")).required(t("form_val_pass_required")),
    repeatedPassword: yup.string().oneOf([yup.ref('formPassword'), null], t("form_val_pass_notmatch")).required(t("form_val_pass_required"))
  });

  const [error, setError] = useState(false);
  const { setIsAuth } = useContext(UserContext);
  const [donorCode, updateDonorCode] = useFormState("");
  const [formEmail, updateFormEmail] = useFormState(email);
  const [formPassword, updateFormPassword] = useFormState(password);
  const [repeatedPassword, updateRepeatedPassword] = useFormState("");

  // Branch selection
  const { branch } = useContext(BranchContext);

  // Form validations
    const { register, trigger, errors } = useForm({
      resolver: yupResolver(schema),
      mode: "onBlur",
    });

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
        url: process.env.REACT_APP_API_URL+"RegisterExistingUser",
        timeout: 5000,
        data: {
          Username: formEmail,
          Password: formPassword,
          DonorCode: donorCode,
          DefaultSubcenterId: branch,
        },
      });
      if (res.status == 200){
        setIsAuth(true) 
        localStorage.setItem("defaultSubcenter", branch);
      }
    } catch (err) {
      // Error
      if (err.response) {
        // client received an error response (5xx, 4xx)
        setError(t("error_common"))
        console.log(err.response);
      } else if (err.request) {
        // client never received a response, or request never left (5xx)
        console.log(err)
        setError(t("error_common"))
      } else {
        setError(t("error_common"))
      }
      console.log(err);
    }
  };
  return (
    <Kontejner>

      <Grid container spacing={0}>
        <form>
          <FormTitle>
            {t("form_introduction")}
          </FormTitle>
           {/* Error message if state true */}
          {errors.formEmail &&  <AlertAnimation children={<ErrorMessage title={errors.formEmail.message}/>}/>}
          {errors.donorCode &&  <AlertAnimation children={<ErrorMessage title={errors.donorCode.message}/>}/>}
          {errors.formPassword && <AlertAnimation children={ <ErrorMessage title={errors.formPassword.message}/>}/>}
          {errors.repeatedPassword &&  <AlertAnimation children={<ErrorMessage title={errors.repeatedPassword.message}/>}/>}
          {error && <AlertAnimation children={<ErrorMessage title={error}/>}/>}
          
          <Grid container spacing={0}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Title title={t("form_title_personal")} />{" "}
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3}>
             <StyledLabel error={errors.formEmail} for id="formEmail">{'Email'}</StyledLabel>
              <StyledInput
                id="formEmail"
                type="text"
                value={formEmail}
                name="formEmail"
                placeholder="myplasma@email.com"
                onChange={updateFormEmail}
                ref={register}
                error={errors.formEmail}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3}>
             <StyledLabel error={errors.formEmail} for id="donorCode">{t("form_donorCode")}</StyledLabel>
              <StyledInput
                id="donorCode"
                type="text"
                value={donorCode}
                name="donorCode"
                placeholder="myplasma@email.com"
                onChange={updateDonorCode}
                ref={register}
                error={errors.donorCode}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Title title={t("form_password")} />{" "}
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3}>
            <StyledLabel error={errors.formPassword} for id="formPassword">{t("form_password")}</StyledLabel>
              <StyledInput
                id="formPassword"
                type="password"
                value={formPassword}
                name="formPassword"
                placeholder={"****"}
                onChange={updateFormPassword}
                ref={register}
                error={errors.formPassword}
              />
            </Grid>
            {/* Repeat password */}
            <Grid item xs={12} sm={6} md={6} lg={3}>
            <StyledLabel error={errors.repeatedPassword} for id="repeatedPassword">{t("form_repeatPassword")}</StyledLabel>
              <StyledInput
                id="repeatedPassword"
                type="password"
                value={repeatedPassword}
                name="repeatedPassword"
                placeholder={"****"}
                onChange={updateRepeatedPassword}
                ref={register}
                error={errors.repeatedPassword}
              />
            </Grid>
          </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Title title={t("form_title_location")} />{" "}
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
           <BranchSpecificContent/>
          
          </Grid>
        </form>
        {/* GDPR checkbox and form, Branch specific */}
        <GdprContainer>
          <GdprGrid item xs={12} sm={12} md={12} lg={12}>
            {branch ? <Checkbox checked={checked} onChange={handleCheck}>
            {t("gdprAgreePre")}<LinkButton label={t("gdprAgree")} onClick={handleOpenGdpr} />
            </Checkbox> : null} 
          </GdprGrid>
          {checked === true  ? (
            <FilledButton
              hoverColor={'#690d12'} 
              color={"#FA6966"}
              label={t("register")}
              onClick={async () => {
              const result = await trigger();
              if (result) { onSubmit() }
            }}
            />
          ) : (
            <DisabledButton color={"#F34B5B"} label={t("register")} />
          )}
        </GdprContainer>
      </Grid>
        {/* Gdpr dialog */}
        <MyDialog open={openGdpr} onClose={handleCloseGdpr} maxWidth={"lg"}>
          <MyDialogContent>
            <GdprContent branch={branch} />
            <DialogActions>
              <Button onClick={handleCloseGdpr} label={t("close")} />
            </DialogActions>
          </MyDialogContent>
        </MyDialog>
    </Kontejner>
  );
}
