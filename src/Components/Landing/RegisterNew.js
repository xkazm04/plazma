import React, { useState } from "react";

import RegistrationFormNew from "./RegistrationFormNew";
import RegistrationContent from '../DynamicContent/RegistrationContent'
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";


const useStyles = makeStyles(() => ({
  container: {
    paddingTop: "1%",
    position: "relative",
    textAlign: 'left',
    width: '100vw',
    borderTop: '1px solid',
  },
  regForm: {
    paddingTop: '2rem',
    marginTop: '25px'
  },
}));


export default function Register({location}) {
  const classes = useStyles();

 

  return (
    <div className={classes.container}>
      <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={6}>
      <RegistrationContent location={location}/>
      </Grid>
      
      <Grid className={classes.regForm} item xs={12} sm={6} md={6}>
        {/* Component with registration form */}
        <RegistrationFormNew location={location}/>
        </Grid>
        </Grid>
      </div>
  );
}
