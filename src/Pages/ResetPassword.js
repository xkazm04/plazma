import {useState} from 'react'
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import axios from 'axios'
import { Link } from "react-router-dom";

import Button from "../Components/Buttons/FormButton";
import ParagraphText from "../Components/Texts/ParagraphText";
import FormInput from "../Components/Forms/FormInput";

import Grid from "@material-ui/core/Grid"

import {SuccessMessage, ErrorMessage} from '../Components/Alerts/Alerts'


const Kontejner = styled.div`
  width: 90vw;
  margin-left: 10vw;
`

export default function ResetPassword() {
  const { t } = useTranslation();

    const changePassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios({
        method: "post",
        timeout: 5000,
        url: process.env.REACT_APP_API_URL+"Login",
        data: {
          Password: '',
        }
      });
      console.log(res);
      setOk(true);
      setError(null);
    } catch (err) {
      // Handle Error Here, not working fine
      setOk(false);
      console.error(err);
      setError(t("error_common"))
      setErrorMessage(t("error_message_common"))
    }
  };

  const [ok, setOk] = useState(false)
  const [error, setError] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  return (

    <Kontejner>
        <h1>{t("resetPass_title")}</h1>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={6}>
            <FormInput placeholder={t("form_newPassword")}type={'password'} />
            <FormInput placeholder={t("form_repeatNewPassword")} type={'password'} />
            
            {/* Result notifications */}
            {error ? <ErrorMessage title={error} message={errorMessage} /> : <ParagraphText content={"We'll never share your email with anyone else"}/>}
            {ok ? <SuccessMessage title={t("resetPass_success")} /> : null}
          </Grid>
        </Grid>
        
         {ok ? <Link to='/'><Button label={t("resetPass_button_homepage")}/></Link> : <Button label={t("button_send")} onClick={changePassword}/> } 
    </Kontejner>

  );
}
