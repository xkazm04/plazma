
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid"
import branchEnum from '../../enums/branches.json'



const Container = styled(Grid)`
 margin-top: 80px;
 margin-left: 30px;
 padding-bottom: 50px;
`

const DayGrid = styled(Grid)`
  color: #858795;
  font-family: Roboto;
  font-size: 14px;
  padding: 5px;
`

const TimeGrid = styled(Grid)`
  font-family: Roboto;
  font-size: 16px;
  padding: 5px;
`
export default function InfoTable1({branch}) {
  const { t } = useTranslation();

  return (
    <>

      {branchEnum.data.filter(data => data.id == branch).map(filteredData => (
        <Container container spacing={0}>

          {filteredData.Monday ? <>  
         <DayGrid item xs={3} lg={3}> Monday:   </DayGrid> 
         <TimeGrid item xs={9} lg={9}> {filteredData.Monday} </TimeGrid></> : null}

         {filteredData.Tuesday ? <>  
         <DayGrid item xs={3} lg={3}> Tuesday:   </DayGrid> 
         <TimeGrid item xs={9} lg={9}> {filteredData.Tuesday} </TimeGrid></> : null}

         {filteredData.Wednesday ? <>  
         <DayGrid item xs={3} lg={3}> Wednesday:   </DayGrid> 
         <TimeGrid item xs={9} lg={9}> {filteredData.Wednesday} </TimeGrid></> : null}

         {filteredData.Thursday ? <>  
         <DayGrid item xs={3} lg={3}> Thursday:   </DayGrid> 
         <TimeGrid item xs={9} lg={9}> {filteredData.Thursday} </TimeGrid></> : null}

         {filteredData.Friday ? <>  
         <DayGrid item xs={3} lg={3}> Monday:   </DayGrid> 
         <TimeGrid item xs={9} lg={9}> {filteredData.Friday} </TimeGrid></> : null}

         </Container>

      ))}


    </>
  );
}
