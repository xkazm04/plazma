import React, { useState, useContext } from "react";
import { UserContext } from "../../Utils/UserContext";
import { BranchContext } from "../../Utils/BranchContext";
import useFormState from "../../../hooks/useFormState";
import axios from "axios";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Loader from "react-spinners/GridLoader";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";

// Custom components
import Button from "../../Buttons/FormButton";
import DisabledButton from "../../Buttons/DisabledButton";
import FilledButton from "../../Buttons/FilledButton";
import LinkButton from "../../Buttons/LinkButton";
import {ErrorMessage} from '../../Alerts/Alerts';
import Title from "../../Texts/Title";
import Checkbox from "../../Forms/Checkbox";
import GdprContent from '../../DynamicContent/GdprContent'

// Animations
import AlertAnimation from '../../Animations/AlertAnimation'

// Form utilities
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from 'moment'

// Dynamic content
import BranchSpecificContent from "../../DynamicContent/BranchSpecificContent";

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

const InputGrid = styled(Grid)`
  margin-top: 1%;
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

const Errors = styled.div`
  margin-top: 20px;
`

export default function RegistrationFormNew({ email, password }) {
  const { t } = useTranslation();
  const schema = yup.object().shape({
    donorFirstName: yup.string().required(t("form_val_firstname_required")),
    donorSurname: yup.string().required(t("form_val_surname_required")),
    formEmail: yup.string().max(50, t("form_val_email_max")).email(t("form_val_email_format")).required(t("form_val_email_required")),
    birthdate: yup.string().max(8, t("form_val_birthdate_max")).required(t("form_val_birthdate_required")),
    pin: yup.string().max(25, t("form_val_pin_max")).required(t("form_val_pin_required")),
    phone: yup.string().max(20, t("form_val_phone_max")).required(t("form_val_phone_required")),
    formPassword: yup.string().min(4, t("form_val_pass_min")).required(t("form_val_pass_required")),
    repeatedPassword: yup.string().oneOf([yup.ref('formPassword'), null], t("form_val_pass_notmatch")).required(t("form_val_pass_required"))
  });
  
 

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

  // Context usage
  const { branch } = useContext(BranchContext);
  const { setIsAuth } = useContext(UserContext);

  // Form validations
  const { register, trigger, errors } = useForm({
      resolver: yupResolver(schema),
      mode: "onBlur",
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
        url: "https://virtserver.swaggerhub.com/xkazm04/User/1.0.0/RegisterNewUser",
        timeout: 5000,
        data: {
          Username: formEmail,
          Password: formPassword,
          FirstName: donorFirstName,
          LastName: donorSurname,
          Email: formEmail,
          Phone: phone,
          BirthDate: birthdate,
          PersonalIdentificationNumber: pin,
          DefaultSubcenterId: branch,
        },
      });
      if (res.status == 200){
        setIsAuth(true) 
        localStorage.setItem("defaultSubcenter", branch);
      }
      setLoading(false);
    } catch (err) {
      // Error 😨
      if (err.response)  {
        // client received an error response (5xx, 4xx)
        console.log(err.response);
        setLoading(false);
      } else if (err.request) {
        // client never received a response, or request never left (5xx)
        console.log(err)
        setLoading(false);
      } else {
        
      }
    }
  };


  // MM,DD,YYYY
  return (
    <div>
      {/* Error message if state true */}
      <Errors>
        {errors.donorFirstName && <AlertAnimation children={<ErrorMessage title={errors.donorFirstName.message}/>}/>}
        {errors.donorSurname &&  <AlertAnimation children={<ErrorMessage title={errors.donorSurname.message}/>}/>}
        {errors.birthdate &&  <AlertAnimation children={<ErrorMessage title={errors.birthdate.message}/>}/>}
        {errors.pin && <AlertAnimation children={<ErrorMessage title={errors.pin.message}/>}/>}
        {errors.formEmail &&  <AlertAnimation children={<ErrorMessage title={errors.formEmail.message}/>}/>}
        {errors.phone &&  <AlertAnimation children={<ErrorMessage title={errors.phone.message}/>}/>}
        {errors.formPassword && <AlertAnimation children={ <ErrorMessage title={errors.formPassword.message}/>}/>}
        {errors.repeatedPassword &&  <AlertAnimation children={<ErrorMessage title={errors.repeatedPassword.message}/>}/>}
      </Errors>
      <Grid container spacing={0}>
        <form>
          <Grid container spacing={0}>
            <FormTitle>
              {t("form_introduction")}
            </FormTitle>
            {/* First name */}
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Title title={t("form_title_personal")} />{" "}
            </Grid>
            <InputGrid item xs={12} sm={6} md={6} lg={4}>
            <StyledLabel error={errors.donorFirstName} for id="donorFirstName">Label</StyledLabel>
              <StyledInput
                ref={register}
                id="donorFirstName"
                type="text"
                value={donorFirstName}
                name="donorFirstName"
                placeholder="John"
                label={t("form_name")}
                onChange={updateFirstName}
                error={errors.donorFirstName}
              />
            </InputGrid>{" "}
            {/* Last name */}
            <InputGrid item xs={12} sm={6} md={6} lg={4}>
              <StyledLabel error={errors.donorSurname} for id="donorSurname">{t("form_surname")}</StyledLabel>
              <StyledInput 
                id="donorSurname"
                type="text"
                value={donorSurname}
                name="donorSurname"
                placeholder="Smith"
                onChange={updateSurname}
                ref={register}
                error={errors.donorSurname}
              />
            </InputGrid>
            {/* Birthdate/Personal identificator based on chose country */}
            <InputGrid item xs={12} sm={6} md={6} lg={4}>
            <StyledLabel error={errors.birthdate} for id="birthdate">{t("form_birthdate")}</StyledLabel>
              <StyledInput
                id="birthdate"
                type="date"
                value={birthdate}
                name="birthdate"
                placeholder="dd/mm/yyyy"
                onChange={updateBirthdate}
                ref={register}
                error={errors.birthdate}
              />
            </InputGrid>
            <InputGrid item xs={12} sm={6} md={6} lg={4}>
            <StyledLabel error={errors.pin} for id="pin">{t("form_pin")}</StyledLabel>
              <StyledInput
                id="pin"
                type="text"
                value={pin}
                name="pin"
                placeholder="123456789"
                onChange={updatePin}
                ref={register}
                error={errors.pin}
              />
            </InputGrid>
            <InputGrid item xs={12} sm={6} md={6} lg={4}>
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
            </InputGrid>
            {/* Phone number*/}
            <InputGrid item xs={12} sm={6} md={6} lg={4}>
            <StyledLabel error={errors.phone} for id="phone">{t("form_phone")}</StyledLabel>
              <StyledInput
                id="phone"
                type="text"
                value={phone}
                name="phone"
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
            </InputGrid>
            {/* Repeat password */}
            <InputGrid item xs={12} sm={6} md={6} lg={4}>
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
        {/* Loading animation after Registration Submit */}
        {isLoading ? <DisabledButton label={<Loader size={10} color={"#f54275"} loading={isLoading} /> }/> :    
        <GdprContainer>
          <GdprGrid item xs={12} sm={12} md={12} lg={12}>
          {branch ? <Checkbox checked={checked} onChange={handleCheck} label={"ahoj"}>
              {t("gdprAgreePre")}
              <LinkButton label={t("gdprAgree")} onClick={handleOpenGdpr} />
            </Checkbox> : null}
          </GdprGrid>
         {checked === true ? (
            <FilledButton
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
         } 

        {/* Gdpr dialog */}
        <MyDialog open={openGdpr} onClose={handleCloseGdpr} maxWidth={"lg"}>
          <MyDialogContent>
            <GdprContent branch={branch} />
            <DialogActions>
              <Button onClick={handleCloseGdpr} label={t("close")} />
            </DialogActions>
          </MyDialogContent>
        </MyDialog>
      </Grid>

    </div>
  );
}
