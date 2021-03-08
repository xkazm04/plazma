import {useState} from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";

import Title from '../Components/Texts/Title'
import InfoTable1 from '../Components/Dashboard/InfoTable1'
import NextVisit from '../Components/Reservation/NextVisit'


const useStyles = makeStyles(() => ({
  container: {
      position: 'relative',
      margin: '0.1rem',
      width: '100vw',
      maxWidth: '100%'
  }
}));

const MyGrid = styled(Grid)`
    background-color: ${(props) => props.theme.colors.light};
    box-shadow: 0 2px 8px 0 ${(props) => props.theme.colors.shadow};
`

// Axios, get personalized info

export default function Dashboard() {
  const classes = useStyles();
  const branch = localStorage.getItem('defaultBranch');

  return (
    <div className={classes.container}>
        <Grid container className={classes.container} spacing={6}>
            <MyGrid item xs={12} sm={6} md={6} spacing={3}>
              <Title title={'Working hours'}/>
              <InfoTable1 branch={branch}/>
              
            </MyGrid>
            <MyGrid item xs={12} sm={6} md={6} spacing={3}>
            <NextVisit/>
            </MyGrid>

        </Grid>
        <Grid container className={classes.container} spacing={6}>
            <MyGrid item xs={12} sm={12} md={12}>
          </MyGrid>

        </Grid>

    </div>
  );
}
