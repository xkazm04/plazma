import {useState} from 'react'
import { makeStyles } from "@material-ui/core/styles";

import NextVisit from '../Components/Reservation/NextVisit';
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    width: '1500px',
  },
}));

const MyGrid = styled(Grid)`
    background-color: ${(props) => props.theme.colors.light};
    box-shadow: 0 2px 8px 0 ${(props) => props.theme.colors.shadow};
`


export default function Visits() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
    <Grid className={classes.container} container spacing={1}>
      
      {/* Styled component - Title */}
      <MyGrid item xs={12} sm={12} md={4} lg={4}>
            <NextVisit/>
      </MyGrid>
      <MyGrid item xs={12} sm={12} md={8} lg={8}>

      </MyGrid>
    </Grid>
    </div>
  );
}
