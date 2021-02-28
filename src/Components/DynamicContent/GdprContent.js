import React, { useState } from "react";


import Title from "../Texts/Title";
import RegistrationFormComplete from "./RegistrationFormComplete";
import ParagraphText from "../Texts/ParagraphText";
import Point from "../Texts/PointText";
import NoteText from "../Texts/NoteText";

import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(() => ({
  container: {

    paddingTop: "1%",
    position: "relative",
    textAlign: 'left',
  },
  regForm: {
    borderTop: '1px solid ',
    paddingTop: '2rem',
  },
}));


export default function Register({location}) {
  const classes = useStyles();

 

  return (
    <div className={classes.container}>

    </div>
  );
}
