import { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import { UserContext } from "../Utils/UserContext";

import axios from 'axios'
import styled from "styled-components";


import useFormState from "../../hooks/useFormState";
import Button from "../Buttons/FormButton";
import RegisterButton from '../Buttons/RegisterButton';
import FilledButton from '../Buttons/FilledButton';
import ToggleButton from "../Buttons/ToggleButton";
import LinkButton from "../Buttons/LinkButton";
import FormInput from "../Forms/FormInput";
import Title from "../Texts/Title";
import ErrorMessage from '../Texts/ErrorMessage';
import FormInputLabel from "../Forms/FormInputLabel";
import ParagraphText from "../Texts/ParagraphText";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";


import RegisterFormNew from './RegistrationFormNew'
import RegisterFormExisting from './RegistrationFormExisting'




const useStyles = makeStyles(() => ({
  forgottenForm: {
    marginLeft: "20px",
    marginRight: "20px",
  },
  registerTitle:{
    marginTop: '5%',
    marginBottom: '2%',
    display: "flex",
    justifyContent: "center",
  }
}));



const Kontejner = styled.div`
    margin-top: 10%;
    display: flex;
    position: relative;
    justify-content: center;
`

const FormContainer = styled.div`
    padding: 10px;
    position: relative;
    text-align: center;
    border: none;
    width: 50%;
    border-radius: 25px;
    margin-left: 5%;
    box-shadow: 12px 16px 40px rgba(0, 72, 102, 0.05);
    @media screen and (max-width: 1000px) {
     width: 100%;
     }
     @media screen and (max-width: 1500px) {
     width: 80%;
     }
`

const MyDialog = styled(Dialog)`
  background: ${(props) => props.theme.Primary.Shade};
`

const MyDialogContent = styled(DialogContent)`
  background: ${(props) => props.theme.colors.blackWhite};
  height: 1000px;
`

const ResetDialogContent = styled(DialogContent)`
  background: ${(props) => props.theme.colors.blackWhite};
`

const Line = styled.div`
  margin: 10%;
  border-top: 1px solid #D1D1D1;
  width: 80%;
  height: 2px;
`

export default function Login() {
  const { t } = useTranslation();
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)
  
  const { setIsAuth } = useContext(UserContext);

  const [email, updateEmail] = useFormState("");
  const [password, updatePassword] = useFormState("");

  const [passwordSentMessage, setPasswordSentMessage] = useState(false)
  const [registerFormType, setRegisterFormType] = useState(false)


    // Login request
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://virtserver.swaggerhub.com/xkazm04/User/1.0.0/login", { Username: email, Password: password });
    //  Catch token from response and save it (local storage)
      localStorage.setItem('token', res.data.Token)
      localStorage.setItem('defaultSubcenter', res.data.DefaultSubcenter)
      localStorage.setItem('donorCode', res.data.DonorCode)
      setError(null);
      setIsAuth(true);
    } catch (err) {
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
    // setError(err);
    setError(err);
    }
  };

  // Forgotten passowrd dialog functions
  const [openResetDialog, setOpenResetDialog] = useState(false);
  const handleOpenReset = () => {
    setOpenResetDialog(true);
  };
  const handleCloseReset = () => {
    setOpenResetDialog(false);
  };

   // Registration dialog functions
   const [openRegisterDialog, setOpenRegisterDialog] = useState(false);
  const handleOpenRegister = () => {
    setOpenRegisterDialog(true);
  };
  const handleCloseRegister = () => {
    setOpenRegisterDialog(false);
  };

  const toggleRegisterType = () => {
    if (registerFormType === true) {
      setRegisterFormType(!registerFormType);
    } else {
      setRegisterFormType(!registerFormType);
    }
  };


  const passwordInquiry = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://virtserver.swaggerhub.com/xkazm04/User/1.0.0/resetPassword", { email });
      console.log("Yess");
      handleCloseReset();
      setError(null);
      setPasswordSentMessage(true);
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

// Login component
    <Kontejner>
      <FormContainer>
        <Title title={t("userLogin.login")}  />
        <RegisterButton label={t("registerOption")} onClick={handleOpenRegister} />
        <Line></Line>
        {/* Error message if state true */}
        {error ? <ErrorMessage title={error} /> : null}
        {passwordSentMessage ? <ErrorMessage title={passwordSentMessage} /> : null}

        {/* Login component */}
        <FormInput  
          smallerWidth={"90%"}        
          onChange={updateEmail}
          width={"80%"}
          placeholder={"Email"} />
        <br></br>
        <FormInput
          smallerWidth={"90%"}  
          onChange={updatePassword}
          placeholder={"****"}
          width={"80%"}
          type="password"
          placeholder={t("userLogin.password")}
        />
        
        <FilledButton label={t("loginOption")} onClick={handleLogin} />
        <br></br>
        <LinkButton width="100%"
          label={t("userLogin.forgottenPassword")}
          onClick={handleOpenReset}
        />
      </FormContainer>


      {/* Registration dialog */}
      <MyDialog open={openRegisterDialog} onClose={handleCloseRegister} maxWidth={"lg"}>
        <MyDialogContent>
    
        <ToggleButton onClick={toggleRegisterType} width={'50%'} label={t("registerNewOption")} active={!registerFormType}/>
        <ToggleButton onClick={toggleRegisterType} width={'50%'} label={t("registerExistingOption")} active={registerFormType}/>

      {registerFormType === false ? 
      <RegisterFormNew email={email} password={password}/> :  
      <RegisterFormExisting email={email} password={password}/>  }
             
        </MyDialogContent>
      </MyDialog>


      {/* Forgotten email dialog */}
      <MyDialog open={openResetDialog} onClose={handleCloseReset} maxWidth={"lg"}>
        <ResetDialogContent>
          <Title title={t("userLogin.forgottenPassword")} />
          <div className={classes.forgottenForm}>
            <ParagraphText
              content=
                {t("userLogin.emailNewPassowrd")}     
            />
            <FormInputLabel label={"Email"} />
            <FormInput
              onChange={updateEmail}
              width={"20rem"}
              placeholder={"mirekdusin@email.cz"}
              type={"email"}
              required={"required"}
            />
          </div>
          <DialogActions>
            <Button onClick={handleCloseReset} label={t("button_back")} />
            <Button onClick={passwordInquiry} label={t("button_send")}/>
          </DialogActions>
        </ResetDialogContent>
      </MyDialog>
    </Kontejner>
  );
}
