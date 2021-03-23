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
import { ClockIcon, LocationIcon } from '../Components/Icons/Icons';




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

const Flex = styled.div`
display: flex;
background: #FFFFFF;
box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.05);
border-radius: 16px;
margin: 10px;
width: 100%;
`

const FlexGroup = styled.div`
`
 
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
   {/* Left part */}

   <GridContainer container spacing={1}>
       {/* Subcenter working hours */}
       <MyGrid item xs={12} sm={7} md={7}>
       <FlexGroup>
       <Flex>
                  <TitleDash title={'Contact us'}/>
                  <DashboardContact branch={branch}/>
              </Flex> 
                <Flex>
                  <TitleDash title={'Working hours'}  icon={<ClockIcon/>}/>
                  <InfoTable1 branch={branch}/>
              </Flex>                
            </FlexGroup>
         </MyGrid>
 

        {/* Subcenter location */}
            <MyGrid item xs={12} sm={5} md={5}>
            <FlexGroup>
              <Flex>
                  <TitleDash title={'Center location'}  icon={<LocationIcon/>}/>
                  <DashboardLocation branch={branch}/> 
                </Flex>
                <Flex>
                  <TitleDash title={'Working hours'}  icon={<ClockIcon/>}/>
                  <InfoTable1 branch={branch}/>
              </Flex>                
            </FlexGroup>
            </MyGrid>  
          
       </GridContainer>
     </DashboardDiv>
    </Kontejner>
  );
}
