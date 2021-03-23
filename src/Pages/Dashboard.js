import {useState} from 'react'
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";

import TitleDash from '../Components/Texts/TitleDash'
import InfoTable1 from '../Components/PageDashboardComponents/InfoTable1'
import DashboardLocation from '../Components/PageDashboardComponents/DashboardLocation'
import DashboardContact from '../Components/PageDashboardComponents/DashboardContact'
import NextVisit from '../Components/PageDashboardComponents/NextVisit'

import RegisterButton from '../Components/Buttons/RegisterButton';
import FilledButton from '../Components/Buttons/FilledButton';

//Icons
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';


const Kontejner = styled.div`
  position: relative;
  z-index: 3;
  margin: 10px;
`

const GridContainer = styled(Grid)`
   text-align: left;
`
const Space = styled.div`
  height: 10px;
  width: 50px;
`

const DashboardDiv = styled.div`
  margin-top: 5%;
  margin-bottom: 20%;
`
 
const MyGrid = styled(Grid)`
position: relative;
z-index: 3;
background: #FFFFFF;
box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.05);
border-radius: 16px;
`

const CircleSmall = styled.circle`
position: absolute;
z-index: 2;
border-radius: 50%;
width: 400px;
height: 400px;
left: 70%;
top: 55%;
background: radial-gradient(closest-side, #2EC5CE,#2EC5CE,rgba(230, 242, 239, 0.7));
opacity: 0.1;
filter: blur(10px);
  -webkit-filter: blur(8px);
`

const CircleLarge = styled.circle`
position: absolute;
z-index: 2;
border-radius: 50%;
width: 1200px;
height: 1200px;
left: -45%;
top: 0%;
background: radial-gradient(closest-side, #2EC5CE,#2EC5CE,rgba(230, 242, 239, 0.7));
opacity: 0.1;
filter: blur(10px);
  -webkit-filter: blur(8px);
`

const ClockIcon = <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.92578 16C13.339 16 16.9258 12.4132 16.9258 8C16.9258 3.58681 13.339 0 8.92578 0C4.51259 0 0.925781 3.58681 0.925781 8C0.925781 12.4132 4.51259 16 8.92578 16Z" fill="#FA6966"/>
<path d="M8.57443 9.40657H11.5634C12.0558 9.40657 12.4426 9.01976 12.4426 8.52745C12.4426 8.03515 12.0558 7.64833 11.5634 7.64833H9.45355V3.95603C9.45355 3.46372 9.06674 3.0769 8.57443 3.0769C8.08213 3.0769 7.69531 3.46372 7.69531 3.95603V8.52745C7.69531 9.01976 8.08213 9.40657 8.57443 9.40657Z" fill="white"/>
</svg>

 const LocationIcon = <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path fill-rule="evenodd" clip-rule="evenodd" d="M6.48554 0C3.41655 0 0.925781 2.4086 0.925781 5.37634C0.925781 8.44086 4.17268 13.129 6.48554 16C8.83175 13.1075 12.0453 8.47312 12.0453 5.37634C12.0453 2.4086 9.55452 0 6.48554 0ZM6.48504 8.06452C4.95054 8.06452 3.70516 6.86022 3.70516 5.37635C3.70516 3.89248 4.95054 2.68818 6.48504 2.68818C8.01953 2.68818 9.26492 3.89248 9.26492 5.37635C9.26492 6.86022 8.01953 8.06452 6.48504 8.06452Z" fill="#FA6966"/>
 </svg>
 
// Axios, get personalized info

export default function Dashboard() {
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
    <Kontejner>
      {/* Top part */}
      <CircleSmall/>
      <CircleLarge/>
        <Grid container spacing={2} >
        <Grid item xs={12} sm={12} md={12}>
            <NextVisit/>
            </Grid>
            <Space/>
        <RegisterButton onClick={changeLocation1} label={"dev button - subcenter 1"}/>
         <FilledButton onClick={changeLocation2} label={"dev button - subcenter 2"}/>
         </Grid>
    <DashboardDiv>
      <GridContainer container spacing={3} xs={12} md={8}>
   {/* Left part */}
   {/* Subcenter working hours */}
        <Grid container xs={12} md={8}  spacing={1}>
            <MyGrid item xs={12} sm={11} md={11}>
              <TitleDash title={'Working hours'}  icon={ClockIcon}/>
              <InfoTable1 branch={branch}/>
            </MyGrid>
            <Grid item xs={12} sm={1} md={1}/>
   {/* Subcenter contact */}
        </Grid>
            <MyGrid item xs={12} sm={4} md={4}>
              <TitleDash title={'Contact us'}/>
              <DashboardContact branch={branch}/>
            </MyGrid>
   {/* Subcenter location */}
            <Grid item xs={12} sm={12} md={12}><Space/></Grid>
            <MyGrid item xs={12} sm={5} md={5}>
              <TitleDash title={'Center location'}  icon={LocationIcon}/>
              <DashboardLocation branch={branch}/>
            </MyGrid>     
          </GridContainer>
          </DashboardDiv>
    </Kontejner>
  );
}
