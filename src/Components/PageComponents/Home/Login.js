import { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { UserContext } from "../../Utils/UserContext";

import axios from 'axios'
import styled from "styled-components";

import Loader from "react-spinners/GridLoader";

import useFormState from "../../../hooks/useFormState";
import RegisterButton from '../../Buttons/RegisterButton';
import FilledButton from '../../Buttons/FilledButton';
import ToggleButton from "../../Buttons/ToggleButton";
import LinkButton from "../../Buttons/LinkButton";
import FormInput from "../../Forms/FormInput";
import TitleParagraphText from "../../Texts/TitleParagraphText";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import RegisterFormNew from './RegistrationFormNew'
import RegisterFormExisting from './RegistrationFormExisting'
import Box from '../../Box'

//Alerts
import {ErrorMessage} from '../../Alerts/Alerts';
import OKMessage from '../../Texts/OKMessage';


const Kontejner = styled.div`
    margin-top: 10%;
    display: flex;
    position: relative;
    justify-content: center;
    @media screen and (max-width: 700px) {
    margin-top: 0;
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

const Xicon = styled.div`
  position: fixed;
  margin-left: 78%;
  color: ${(props) => props.theme.Primary.Main};
  &:hover{
    cursor:pointer;
    color: ${(props) => props.theme.Primary.Dark};
  };
  @media screen and (max-width: 1000px) {
    opacity: 0;
  }
`

const LoginTitle = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 150%;
  text-align: center;
  letter-spacing: -0.01em;
  color: #0B3A3D;
@media screen and (max-width: 800px) {
  font-size: 15px;
  }
`

const Highlight = styled.a`
  color: ${(props) => props.theme.Primary.Main};
`

export default function Login() {
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  
  const { setIsAuth } = useContext(UserContext);

  const [email, updateEmail] = useFormState("");
  const [password, updatePassword] = useFormState("");
  const [passwordSentMessage, setPasswordSentMessage] = useState(false)
  const [registerFormType, setRegisterFormType] = useState(false)


    // Login request
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios({
        method: "post",
        timeout: 5000,
        url: process.env.REACT_APP_API_URL+"Login",
        data: {
          Username: email,
          Password: password,
        }
      });
    //  Metadata Error
      if (res.data.token == null){
        console.log('caught metadata error')
        console.log(res.data.metaData.notifications.message)
        setError(res.data.metaData.notifications.message)
        setLoading(false);
      }
    // Response 200
      else {
      localStorage.setItem('jwt', res.data.token)
      localStorage.setItem('defaultSubcenter', res.data.mobileUser.defaultSubcenterId)
      localStorage.setItem('donorCode', res.data.mobileUser.DonorCode)
      setError(null);
      setIsAuth(true);
      setLoading(false);
      }
    } catch (err) {
      // Error
      if (err.response === 401) { 
        // client received an error response (5xx)
        console.log(err)
        setError(t("error_common"))
        setErrorMessage(t("error_message_common"))
      } if (err.response) { 
        // client received an error response (5xx)
        console.log(err)
        setError(t("error_common"))
        setErrorMessage(t("error_message_common"))
      }
      else if (err.request) { 
        // client never received a response, or request never left (4xx)
        console.log(err)
        setError(t("error_common"))
        setErrorMessage(t("error_message_common"))
      } else { 
        // anything else 
        setError(t("error_common"))
        setErrorMessage(t("error_message_common"))
      } 
    setLoading(false);
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

  // Toggle Registration form New/Existing
  const toggleRegisterType = () => {
    if (registerFormType === true) return setRegisterFormType(!registerFormType);
    return setRegisterFormType(!registerFormType)
  }


  const passwordInquiry = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(process.env.REACT_APP_API_URL+"resetPassword", { email });
      console.log(res);
      handleCloseReset();
    } catch (err) {
      // Error 😨
      if (err.response) {
        // client received an error response (4xx)
        console.log(err.response);
        setError(t("error_resetPassword"))
        setLoading(false);
      } else if (err.request) {
        // client never received a response, or request never left (5xx)
        console.log(err)
        setError(t("error_common"))
        setErrorMessage(t("error_message_common"))
        setLoading(false);
      } else {
      }
    }
    setPasswordSentMessage("New password requested");
    setError(null);
    setLoading(false);
  };

  return (

// Login component
    <Kontejner>
      <Box children={      <div> <LoginTitle> Become a donor <Highlight>Today</Highlight> </LoginTitle>
        <RegisterButton label={t("registerOption")} onClick={handleOpenRegister} />
        {process.env.ENV_URL}
        <Line></Line>
        {/* Error message if state true */}
        {passwordSentMessage ? <OKMessage title={passwordSentMessage} /> : null}
        {loading ? <Loader size={10} color={"#f54275"} loading={loading} /> :
          null
        }
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
         {error ? <ErrorMessage title={error} message={errorMessage} /> : null}
        <FilledButton label={t("loginOption")} onClick={handleLogin} />
        <br></br>
        <LinkButton width="100%"
          label={t("userLogin.forgottenPassword")}
          onClick={handleOpenReset}
        /> </div>}/>

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
            <Xicon onClick={handleCloseReset}/>
            <TitleParagraphText
              content=
                {t("userLogin.emailNewPassowrd")}     
            />
            <FormInput
              onChange={updateEmail}
              width={"20rem"}
              placeholder={"mirekdusin@email.cz"}
              type={"email"}
              required={"required"}
            />
          <DialogActions>
            <RegisterButton onClick={handleCloseReset} label={t("button_back")} />
            <FilledButton  onClick={passwordInquiry} label={t("button_send")}/>
          </DialogActions>
        </ResetDialogContent>
      </MyDialog>
    </Kontejner>
  );
}
