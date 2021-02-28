import {useState} from 'react'
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import Button from "../Components/Buttons/FormButton";
import ParagraphText from "../Components/Texts/ParagraphText";
import FormInput from "../Components/Forms/FormInput";

import Grid from "@material-ui/core/Grid"
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const Kontejner = styled.div`
  width: 90vw;
  margin-left: 10vw;
`

  // Dialog styling
  const MyDialog = styled(Dialog)`
    background: black;
  `;

  const MyDialogContent = styled(DialogContent)`
    background: ${(props) => props.theme.colors.blackWhite};
  `;

export default function ResetPassword() {

    // const resetPassword = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.post("http://localhost:5000/api/resetPassword", { email, password });
  //     console.log("Yess");
  //     setError(null);
  //  Redirect
  //   } catch (err) {
  //     // Handle Error Here, not working fine
  //     console.error(err);
  //     setError(err);
  //   }
  // };

  const { t } = useTranslation();
  const [error, setError] = useState(null)
  const [openPassDialog, setPassDialog] = useState(false);
  const openPass = () => {
    setPassDialog(true);
  };
  const closePass = () => {
    setPassDialog(false);
  };

  return (

    <Kontejner>
        {error === null ? <p>ok</p> : error}
        <h1>Reset password form</h1>
        <FormInput placeholder={"Enter your email address"}/>
        <ParagraphText content={"We'll never share your email with anyone else"}/>
        <Button label={"Submit"} onClick={openPass}/>

      {/* Change password dialog  */}
  
      <MyDialog open={openPassDialog} onClose={closePass} keepMounted>
        <MyDialogContent>
          <DialogTitle>{t("profile_changePassword")}</DialogTitle>
          <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={6}>
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
        
        {/* <p>You recently requested to reset your access password for Reservation system account</p>

        <button>Submit</button>

        <p>If you did not request a password reset, please ignore this mail or contact support</p>
        <p>Thanks, TvojeMama</p> */}
    </Kontejner>

  );
}
