import { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { BranchContext } from "../Components/Utils/BranchContext";

import Button from "../Components/Buttons/FormButton";
import ParagraphText from "../Components/Texts/ParagraphText";
import FormInput from "../Components/Forms/FormInput";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";


const useStyles = makeStyles(() => ({
  container: {
    position: 'relative',
    margin: '0.1rem',
    width: '100vw',
    maxWidth: '100%',
  },
  changeButtons: {
    display: "flex",
    flexDirection: "column",
  },
}));


const MyGrid = styled(Grid)`
  background-color: ${(props) => props.theme.colors.light};
  box-shadow: 0 2px 8px 0 ${(props) => props.theme.colors.shadow};
`;

export default function Register() {
  const classes = useStyles();
  // Language part
  const { t } = useTranslation();
  const {i18n} = useTranslation()
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  }

  // Change password, Change branch, Change email
  const { defaultBranch, setDefaultBranch } = useContext(BranchContext);
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
    setDefaultBranch('Praha');
  };

  // Dialog styling
  const MyDialog = styled(Dialog)`
    background: black;
  `;

  const MyDialogContent = styled(DialogContent)`
    background: ${(props) => props.theme.colors.blackWhite};
  `;

  return (
    <div >
      <Grid container className={classes.container} spacing={3}>
        <MyGrid item xs={12} sm={12} md={12}>
          <h1> Albert Brutus</h1>
          albertos@net.cz
        </MyGrid>
        <MyGrid item xs={12} sm={12} md={12}>
          <ParagraphText content={"Moje pobočka: " + defaultBranch} /> 
          <ParagraphText content={t("profile_changeLanguage")} />
          <button onClick={() => {changeLanguage("cz");}}>CZ</button>             
          <button onClick={() => {changeLanguage("en");}}> EN</button>  
        </MyGrid>
        <MyGrid item xs={12} sm={12} md={12}>
          <div className={classes.changeButtons}>
            <Button label={t("profile_changeEmail")} onClick={openEmail}  />
            <Button label={t("profile_changePassword")} onClick={openPass} />
            <Button label={t("profile_changeBranch")} onClick={openBranch}  />        
          </div>
        </MyGrid>
      </Grid>
      {/* Change email dialog  */}
  
      <MyDialog open={openPassDialog} onClose={closePass} keepMounted>
        <MyDialogContent>
          <DialogTitle>{t("profile_changePassword")}</DialogTitle>
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

      
    </div>
  );
}
