import { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import { UserContext } from "../Utils/UserContext";

import axios from 'axios'
import styled from "styled-components";

import useFormState from "../../hooks/useFormState";
import Button from "../Buttons/FormButton";
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
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import RegistrationContent from '../DynamicContent/RegistrationContent'
import RegisterFormNew from './RegistrationFormNew'
import RegisterFormExisting from './RegistrationFormExisting'

import Branches from '../../enums/Branches'


const useStyles = makeStyles(() => ({
  container: {
    marginTop: '20px',
    width: '100vw',
    display: "flex",
    position: "relative",
    justifyContent: "center",
  },
  form: {
    padding: 10,
    position: "relative",
    textAlign: "center",
    border: "none",
    width: '70%',
    border: '0.1px solid #0a3612',
    borderRadius: '25px',
  },
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

const MyDialog = styled(Dialog)`
  background: black;
`;

const MyDialogContent = styled(DialogContent)`
  background: ${(props) => props.theme.colors.blackWhite};
  width: 900px;
  height: 700px;
`;


const MyBranchSelect = styled(Select)`

  background-color: ${(props) => props.theme.colors.input};
  color: ${(props) => props.theme.colors.text};
  height: 15%;
  display: flex;
  position: relative;
  padding: 0.2rem;
  font-weight: bold;
  font-size: 1rem;
  text-align: center;
  border-radius: 0.5em;
  cursor: pointer;
  outline: none;
  min-width: 220px;
  transition-duration: 0.4s;
  font-family: Roboto;
  margin-bottom: 2rem;

  &:hover {
    background-color: ${(props) => props.theme.colors.main};
    border-bottom: none;
  }
  &:focus {
    background-color: ${(props) => props.theme.colors.main};
    border-bottom: none;
  }

`

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
`

export default function Login() {
  const { t } = useTranslation();
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)
  
  const { setIsAuth } = useContext(UserContext);

  const [email, updateEmail] = useFormState("");
  const [password, updatePassword] = useFormState("");
  const [branch, setBranch] = useState(null)
  const [passwordSentMessage, setPasswordSentMessage] = useState(false)
  const [registerFormType, setRegisterFormType] = useState(false)

  // Country selection functions
    const [openBranches, setOpenBranches] = useState(false);
    const handleOpenBranches = () => {
      setOpenBranches(true);
    };
    const handleCloseBranches = () => {
      setOpenBranches(false); 
    };
    const handleChangeBranch = (event) => {
      setBranch(event.target.value);
    };

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
    <div className={classes.container}>
      <div className={classes.form}>
        <Title title={t("userLogin.login")}  />
        {/* Error message if state true */}
        {error ? <ErrorMessage title={error} /> : null}
        {passwordSentMessage ? <ErrorMessage title={passwordSentMessage} /> : null}

        {/* Login component */}
        <FormInput          
          smallerWidth="30vw"
          onChange={updateEmail}
          width={"80%"}
          placeholder={"Email"} />
        <br></br>
        <FormInput
          smallerWidth="30vw"
          onChange={updatePassword}
          placeholder={"****"}
          width={"80%"}
          type="password"
          placeholder={t("userLogin.password")}
        />
         <p>{t("userLogin.new")}</p>
        <Button label={t("registerOption")} onClick={handleOpenRegister} />
        <p>{t("userLogin.notNew")}</p>
        <Button label={t("loginOption")} onClick={handleLogin} />
        <br></br>
        <LinkButton width="100%"
          label={t("userLogin.forgottenPassword")}
          onClick={handleOpenReset}
        />
      </div>


      {/* Registration dialog */}
      <MyDialog open={openRegisterDialog} onClose={handleCloseRegister} maxWidth={"lg"}>
        <MyDialogContent>
    
        <ToggleButton onClick={toggleRegisterType} width={'50%'} label={t("registerNewOption")} active={!registerFormType}/>
        <ToggleButton onClick={toggleRegisterType} width={'50%'} label={t("registerExistingOption")} active={registerFormType}/>
              {/* Branch select */}
              <MyBranchSelect
                      open={openBranches}
                      value={branch}
                      onChange={handleChangeBranch}
                      displayEmpty
                      onOpen={handleOpenBranches}
                      onClose={handleCloseBranches}
                      defaultValue={t("landing_chooseBranchSelect")} >
                      <MyMenuItem value={null}>
                        <em>{t("chooseBranchSelect")}</em>
                      </MyMenuItem>
                      {Branches.map((loc) => (
                        <MyMenuItem value={loc.id}>
                          {loc.locationName}
                        </MyMenuItem>
                      ))}
                    </MyBranchSelect>
      <div className={classes.registerTitle}> 
      {/* Dynamic component title based on chosen brnach */}
      <RegistrationContent branch={branch}/>
 
      </div>

      {registerFormType === false ? 
      <RegisterFormNew email={email} password={password} branch={branch}/> :  
      <RegisterFormExisting email={email} password={password} branch={branch}/>  }
             
        </MyDialogContent>
      </MyDialog>


      {/* Forgotten email dialog */}
      <MyDialog open={openResetDialog} onClose={handleCloseReset} maxWidth={"lg"}>
        <MyDialogContent>
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
        </MyDialogContent>
      </MyDialog>
    </div>
  );
}
