import { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import { UserContext } from "../Utils/UserContext";
import { BranchContext } from "../Utils/BranchContext";
import styled from "styled-components";

import useFormState from "../../hooks/useFormState";
import Button from "../Buttons/FormButton";
import LinkButton from "../Buttons/LinkButton";
import FormInput from "../Forms/FormInput";
import Title from "../Texts/Title";
import ErrorMessage from '../Texts/ErrorMessage';
import FormInputLabel from "../Forms/FormInputLabel";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import ParagraphText from "../Texts/ParagraphText";

const useStyles = makeStyles(() => ({
  container: {
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
    borderTop: "solid 1px",
    width: '50%'
  },
  forgottenForm: {
    marginLeft: "20px",
    marginRight: "20px",
  },
}));

const MyDialog = styled(Dialog)`
  background: black;
`;

const MyDialogContent = styled(DialogContent)`
  background: ${(props) => props.theme.colors.blackWhite};
`;

export default function Login() {
  const { t } = useTranslation();
  const { defaultBranch, setDefaultBranch } = useContext(BranchContext);
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [email, updateEmail] = useFormState("");
  const { isAuth, setIsAuth } = useContext(UserContext);
  const {passwordSentMessage, setPasswordSentMessage} = useState(false)

  const handleLogin = () => {
    setIsAuth(true);
    console.log(isAuth);
  };

  // Login request
  // const login = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.post("http://localhost:5000/api/customer", { username, password });
  //    Catch token from response and save it (local storage)
  // localStorage.setItem('token', res.data.token)
  //     console.log("Yess");
  //     setOpen(false);
  //     setError(null);
  //     setIsAuth(true);
  //   } catch (err) {
  //     console.error(err);
  //     setError(err);
  //   }
  // };

  // Forgotten passowrd form
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // const askNewPassword = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.post("http://localhost:5000/api/customer", { email });
  //     console.log("Yess");
  //     setOpen(false);
  //     setError(null);
  //     setPasswordSentMessage(true);
  //   } catch (err) {
  //     // Handle Error Here, not working fine
  //     console.error(err);
  //     setError(err);
  //   }
  // };

  return (
    <div className={classes.container}>
      <div className={classes.form}>
        <Title title={t("userLogin.login")}  />
        {/* Error message if state true */}
        {error ? <ErrorMessage title={error} /> : null}
        {passwordSentMessage ? <ErrorMessage title={passwordSentMessage} /> : null}

        <FormInput width={"80%"} type="text" placeholder={"Email"} />
        <br></br>
        <FormInput
          width={"80%"}
          type="password"
          placeholder={t("userLogin.password")}
        />

        <Button label={t("loginOption")} onClick={handleLogin} />
        <br></br>
        <LinkButton width="50%"
          label={t("userLogin.forgotPassword")}
          onClick={handleOpen}
        />
      </div>

      {/* Forgotten email dialog */}
      <MyDialog open={open} onClose={handleClose} maxWidth={"lg"}>
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
            <Button onClick={handleClose} label={t("button_back")} />
            <Button onClick={handleClose} label={t("button_send")}/>
          </DialogActions>
        </MyDialogContent>
      </MyDialog>
    </div>
  );
}
