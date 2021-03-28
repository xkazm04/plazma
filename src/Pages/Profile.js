import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import Button from "../Components/Buttons/FormButton";
import ParagraphText from "../Components/Texts/ParagraphText";
import FormInput from "../Components/Forms/FormInput";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ChangePasswordSvg, ChangeEmailSvg, ChangeBranchSvg } from "../Components/Icons/Icons";

const useStyles = makeStyles(() => ({
  changeButtons: {
    display: "flex",
    flexDirection: "column",
  },
}));

const Kontejner = styled.div`
  background: white;
  width: 100%;
  padding: 5%;
`


export default function Register() {
  const classes = useStyles();
  // Language part
  const { t } = useTranslation();
  const {i18n} = useTranslation()
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  }

  // Change password, Change branch, Change email
  const defaultBranch = localStorage.getItem('defaultSubcenter')
  const [openPassDialog, setPassDialog] = useState(false);
  const [openEmailDialog, setEmailDialog] = useState(false);
  const [openBranchDialog, setBranchDialog] = useState(false);

  // Change password functions
  const openPass = () => {
    setPassDialog(true);
  };
  const closePass = () => {
    setPassDialog(false);
  };

  // Change email functions
  const openEmail = () => {
    setEmailDialog(true);
    };
  const closeEmail = () => {
    setEmailDialog(false);
    };

  // Change branch functions
  const openBranch = () => {
    setBranchDialog(true);
  };
  const closeBranch = () => {
    setBranchDialog(false);
  };
  const changeBranch = () => {
    setBranchDialog(false);
    localStorage.setItem('New changed branch')
  };

  // Dialog styling
  const MyDialog = styled(Dialog)`
    background: black;
  `;

  const MyDialogContent = styled(DialogContent)`
    background: ${(props) => props.theme.colors.blackWhite};
  `;


  return (
    <Kontejner >
      <Grid container direction='row' spacing={3}>
        <Grid item xs={12} sm={2} md={2}>
          <h1> Albert Brutus</h1>
          albertos@net.cz
        </Grid>
        {/* <Grid item xs={12} sm={2} md={2}>
          <ParagraphText content={t("profile_changeLanguage")} />
          <button onClick={() => {changeLanguage("cz");}}>CZ</button>             
          <button onClick={() => {changeLanguage("en");}}> EN</button>  
        </Grid> */}
        <Grid item xs={12} sm={10} md={10}>
          <div className={classes.changeButtons}>
            <Button label={t("profile_changeEmail")} onClick={openEmail}  />
            <Button label={t("profile_changePassword")} onClick={openPass} />
            <Button label={t("profile_changeBranch")} onClick={openBranch}  />      

          </div>
        </Grid>
      </Grid>
      {/* Change email dialog  */}
  
      <MyDialog open={openPassDialog} onClose={closePass} keepMounted>
        <MyDialogContent>
          <DialogTitle>{t("profile_changePassword")}</DialogTitle>
          <ChangePasswordSvg/>
          <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={6}>
            <FormInput placeholder={t("form_currentPassword")} type={'password'} />
            <FormInput placeholder={t("form_newPassword")}type={'password'} />
            <FormInput placeholder={t("form_repeatNewPassword")} type={'password'} />
          </Grid>
          <DialogActions>
            <Button label={t("button_back")} width="50%" onClick={closePass} />
            <Button
              label={t("profile_changePassword")}
              width='250px'
              onClick={closePass}
            />
          </DialogActions>
          </Grid>
        </MyDialogContent>
      </MyDialog>

            {/* Change email dialog  */}
  
            <MyDialog open={openEmailDialog} onClose={closeEmail} keepMounted>
        <MyDialogContent>
          <DialogTitle>{t("profile_changeEmail")}</DialogTitle>
          <ChangeEmailSvg/>
          <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={6}>
            <FormInput placeholder={t("form_enterEmail")} type={'email'} />
          </Grid>
          <DialogActions>
            <Button label={t("button_back")} width="50%" onClick={closeEmail} />
            <Button
              label={t("profile_changeEmail")}
              width='250px'
              onClick={closeEmail}
            />
          </DialogActions>
          </Grid>
        </MyDialogContent>
      </MyDialog>

            {/* Change branch dialog  */}
  
            <MyDialog open={openBranchDialog} onClose={closeBranch} keepMounted>
        <MyDialogContent>
          <DialogTitle>{t("profile_changeBranch")}</DialogTitle>
          <ChangeBranchSvg/>
          <Grid container spacing={1}>

          <Grid item xs={12} sm={6} md={6}>
            <FormInput placeholder={t("chooseBranchSelect")} type={'text'} />
          </Grid>
          <DialogActions>
            <Button label={t("button_back")} width="50%" onClick={closeBranch} />
            <Button
              label={t("profile_changeBranch")}
              width='250px'
              onClick={changeBranch}
            />
          </DialogActions>
          </Grid>
        </MyDialogContent>
      </MyDialog>

      
    </Kontejner>
  );
}
