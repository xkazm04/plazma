import {useState} from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";

import TitleDash from '../Components/Texts/TitleDash'
import InfoTable1 from '../Components/PageDashboardComponents/InfoTable1'
import DashboardLocation from '../Components/PageDashboardComponents/DashboardLocation'
import DashboardContact from '../Components/PageDashboardComponents/DashboardContact'
import NextVisit from '../Components/PageReservationComponents/NextVisit'

import RegisterButton from '../Components/Buttons/RegisterButton';
import FilledButton from '../Components/Buttons/FilledButton';

//Icons
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';


const useStyles = makeStyles(() => ({
  container: {
      position: 'relative',
      margin: '0.1rem',
      width: '100vw',
      maxWidth: '100%',
  }
}));

const GridContainer = styled(Grid)`
  background: white;
   box-shadow: 12px 16px 40px rgba(0, 72, 102, 0.05);
   text-align: left;
`
const Space = styled.div`
  height: 80px;
  width: 50px;
`


// Axios, get personalized info

export default function Dashboard() {
  const classes = useStyles();
  const [branch,setBranch] = useState("1")

  const changeLocation2 = () => {
    localStorage.setItem('defaultSubcenter',"2");
    setBranch('2')
  };

  const changeLocation1 = () => {
    localStorage.setItem('defaultSubcenter',"1");
    setBranch('1')
  };

  return (
    <div className={classes.container}>
        <Grid container className={classes.container} spacing={2}>
        <Grid item xs={12} sm={12} md={12}>
            <NextVisit/>
            </Grid>
            <Space/>
            <RegisterButton onClick={changeLocation1} label={"dev button - subcenter 1"}/>
         <FilledButton onClick={changeLocation2} label={"dev - subcenter 2"}/>
     
        <GridContainer container className={classes.container} spacing={5}>
            <Grid item xs={12} sm={4} md={4}>
              <TitleDash title={'Working hours'} icon={<AccessTimeIcon color={"Secondary"}/>}/>
              <InfoTable1 branch={branch}/>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <TitleDash title={'Center location'} icon={<LocationOnIcon color={"Secondary"}/>}/>
              <DashboardLocation branch={branch}/>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <TitleDash title={'Accept first time donors on'} icon={<ContactSupportIcon color={"Secondary"}/>}/>
              <DashboardContact branch={branch}/>
            </Grid>
            </GridContainer>
        </Grid>
    </div>
  );
}
