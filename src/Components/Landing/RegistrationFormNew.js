// create.component.js

import React, {useRef, useState, useContext}  from 'react';
import { UserContext } from '../Utils/UserContext'
import { BranchContext } from '../Utils/BranchContext'
import useFormState from "../../hooks/useFormState";
import axios from 'axios';
// Material UI form control
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";

import DataButton from "../Buttons/DataButton";
import Button from "../Buttons/FormButton";
import LoadingButton from "../Buttons/IconButton";
import FormInput from "../Forms/FormInput";
import FormInputLabel from "../Forms/FormInputLabel";
import MyCheckbox from "../Buttons/Checkbox";
import GdprDialog from "../Texts/Gdpr";
import LinkButton from '../Buttons/LinkButton';
import ParagraphText from '../Texts/ParagraphText';
import ErrorMessage from '../Texts/ErrorMessage';

import { useTranslation } from 'react-i18next';

const token = '12345'

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        position: 'relative',
        justifyContent: 'center',
    },
    formInputRow:{
        display: 'flex',
        marginBottom: '0.2rem',
    },
    inputItem:{
        display: 'flex',
        flexDirection: 'column',
    },
    gdpr: {
        display: 'flex',
        marginBottom: '2vh',
      },
    formContainer:{
        marginTop: '3vh',
    },
    dialogContainer:{
      paddingTop: '5px',
      padding: '2rem',
      paddingLeft: '5rem',
      minWidth: '150px',
    },
    dialogValuesContainer:{
      padding: '1rem',
      maxWidth: '100%',
    },
    dialogWarning:{
      paddingLeft: '4%',
    },
    formP:{
      paddingBottom: '0.6rem',
    } ,
    loader:{
      position: 'absolute'
    }
  }));

  const MyDialog = styled(Dialog)`
  background: black;
`

const MyDialogContent = styled(DialogContent)`
  background: ${props => props.theme.colors.blackWhite};
`


export default function RegistrationFormNew ({location}) {  
  const classes = useStyles(); 
  const { t } = useTranslation();
  const [error, setError] = useState(null)
  const {isAuth, setIsAuth} = useContext(UserContext);
  const {defualtBranch, setDefaultBranch} = useContext(BranchContext)


    //Method 1
    const [isLoading, setLoading] = useState(false);



  const [donorFirstName, updateFirstName] = useFormState("");
  const [donorSurname, updateSurname] = useFormState("");
  const [birthdate, updateBirthdate] = useFormState("");
  const [email, updateEmail] = useFormState("");
  const [phone, updatePhone] = useFormState("");
  const [password, updatePassword] = useFormState("");
  const [repeatedPassword, updateRepeatedPassword] = useFormState("");

// Registration form, allow only if password match
  const [regConfirm, setRegConfirm] = useState(false);

  const handleCloseRegConfirm = () => {
    setRegConfirm(false);
  };
  
  const handleOpenRegConfirm = () => {
    if (password === repeatedPassword){
      console.log("Password ok");
      setError(null);
      setRegConfirm(true);
    } else {
      console.log("Password nok")
      setError("Chyba: Zadaná hesla nejsou shodná");
    }
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
  e.preventDefault();
  setDefaultBranch(location)
  try {
      const res = await axios({
        method: 'post',
        url: 'https://development-mobileapi.plasmastream.eu/RegisterNewUser',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          'Content-Type': 'application/json'
        },
        data: {
          Username: email,
          Password: password,
          FirstName: donorFirstName,
          LastName: donorSurname,
          PersonalIdentificationNumber: birthdate,
          DefaultSubcenterId: "3"
      }
      });
      console.log("Yess");
      console.log(res.data)
      setLoading(false);
      handleCloseRegConfirm();
      // Reset error message 
      setError(null);
      // Go to login mode
      setIsAuth(true);
  } catch (err) {
    // Error 😨
    if (err.response) { 
      // client received an error response (5xx, 4xx)
      console.log(err.response)
    } else if (err.request) { 
      // client never received a response, or request never left 
      console.log(err.request)
    } else { 
      // anything else 
    } 
  setLoading(false);
  console.log(err);
  // setError(err);
  handleCloseRegConfirm();
  };
};

return (
  <div className={classes.container}>
    <div className={classes.formContainer}>
 <div>
    {/* Error message if state true */}
    {error  ? <ErrorMessage title={error} /> : null }

{/* Register from */}
 <div className={classes.formInputRow}>
     <div className={classes.inputItem}>
            <FormInputLabel label={t('form_donorCode')}/>
            <FormInput onChange={updateFirstName} placeholder={"Mirek"} type={"text"} width="200px" smallerWidth='20vw'/>
        </div>
      <div className={classes.inputItem}>
            <FormInputLabel label={t('form_surname')}/>
            <FormInput onChange={updateSurname} placeholder={"Dušín"} type={"text"} width="200px" smallerWidth='20vw'/>
        </div>  
        <div className={classes.inputItem}>  
            <FormInputLabel label={t('form_birthdate')}/>
            <FormInput onChange={updateBirthdate}  placeholder={"8010123289"}  type={"text"}  width="200px" smallerWidth='20vw' />
        </div>
      <div>
     </div>
 </div>
 <div>
    <div className={classes.formInputRow}>
         <div className={classes.inputItem}>
            <FormInputLabel label={"Email"}/>
            <FormInput onChange={updateEmail} width="200px" smallerWidth='30vw'placeholder={"mirekdusin@email.cz"} type={"email"} />
         </div>
        <div className={classes.inputItem}>
            <FormInputLabel label={t('form_phoneNumber')}/>
            <FormInput onChange={updatePhone} width="200px" smallerWidth='30vw' placeholder={"+420123456789"} type={"text"} />
     </div>
     </div>
 </div>
 <div>
 <div className={classes.formInputRow}>
     <div className={classes.inputItem}>
            <FormInputLabel label={t('form_password')}/>
            <FormInput onChange={updatePassword} placeholder={"****"} type={"password"} width="200px" smallerWidth='30vw'/>
     </div>

     <div className={classes.inputItem}>
            <FormInputLabel label={t('form_repeatPassword')}/>
            <FormInput onChange={updateRepeatedPassword} placeholder={"****"}  type={"password"} width="200px" smallerWidth='30vw'/>
     </div>

     </div>
     <div className={classes.gdpr}>
        <MyCheckbox checked={checked} onChange={handleCheck}/>  
        <LinkButton label={t('gdprAgree')} onClick={handleOpenGdpr}/>
    </div>
 </div>
          {checked === true ? <Button onClick={handleOpenRegConfirm} label="Register"/> : null }
 </div>
 {/* Register confirmation dialog */}
            <MyDialog open={regConfirm} onClose={handleCloseRegConfirm}  maxWidth={"lg"}>
              <MyDialogContent>
            <DialogTitle>{t('userLogin_TBD')}</DialogTitle>
            <div className={classes.dialogWarning}>
            <ParagraphText content={t('checkRegisterData')} />
            </div>  
            <Grid container spacing={1} className={classes.dialogValuesContainer}>
              <Grid item sm={6}>
                  <div className={classes.dialogContainer}>
                  <p className={classes.formP}>{t('form_name')} </p>
                  <p className={classes.formP}>{t('form_surname')}</p>
                  <p className={classes.formP}>{t('form_birthDate')}</p>
                  <p className={classes.formP}>Email </p>
                  <p className={classes.formP}>{t('form_phoneNumber')} </p>
                  </div>
              </Grid>
              <Grid item sm={6}>
              <div className={classes.dialogValuesContainer}>
                  <p><DataButton label={donorFirstName}/></p>
                  <p><DataButton label={donorSurname}/>  </p>
                  <p><DataButton label={birthdate}/></p>
                  <p><DataButton label={email}/></p>
                  <p><DataButton label={phone}/></p>
                </div>
              </Grid>
              </Grid>
             
            <DialogActions>
              {isLoading == false ?
                <Button onClick={onSubmit} label="Confirm" /> 
                :
                <LoadingButton label="Loading" /> 
              }
                
                <Button onClick={handleCloseRegConfirm} label="Close" />
            </DialogActions>
            </MyDialogContent>
            </MyDialog>

                    
{/* Gdpr dialog */}
<MyDialog open={openGdpr} onClose={handleCloseGdpr} maxWidth={"lg"}>
          <MyDialogContent>
          <DialogTitle>GDPR</DialogTitle>
            <GdprDialog location={location}/>
          <DialogActions>
            <Button onClick={handleCloseGdpr} label={t('close')} />
          </DialogActions>
          </MyDialogContent>
        </MyDialog>
        </div>
       
    </div>
      )};