
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid"
import branchEnum from '../../enums/branches.json'
import Title from '../Texts/Title'

const Container = styled(Grid)`
 padding-bottom: 20px;
 margin-left: 2%;
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
  @media screen and (max-width: 1000px) {
    font-size: 14px;
     }
`


export default function WorkingHours({branch}) {
  const { t } = useTranslation();
  console.log(branch)

  return (
    <>
      {branchEnum.data.filter(data => data.id === branch).map(filteredData => (
    
        <Container container spacing={0}>
          <Grid item xs={12} lg={12}>
          <Title title={t("dashboardTitle_workingHours")} /></Grid>
          {filteredData.Monday ? <>  
         <DayGrid item xs={4} lg={4}> {t("day.monday")}:   </DayGrid> 
         <TimeGrid item xs={8} lg={8}> {filteredData.Monday} </TimeGrid></> : null}

         {filteredData.Tuesday ? <>  
         <DayGrid item xs={4} lg={4}> {t("day.tuesday")}:    </DayGrid> 
         <TimeGrid item xs={8} lg={8}> {filteredData.Tuesday} </TimeGrid></> : null}

         {filteredData.Wednesday ? <>  
         <DayGrid item xs={4} lg={4}> {t("day.wednesday")}:    </DayGrid> 
         <TimeGrid item xs={8} lg={8}> {filteredData.Wednesday} </TimeGrid></> : null}

         {filteredData.Thursday ? <>  
         <DayGrid item xs={4} lg={4}> {t("day.thursday")}:   </DayGrid> 
         <TimeGrid item xs={8} lg={8}> {filteredData.Thursday} </TimeGrid></> : null}

         {filteredData.Friday ? <>  
         <DayGrid item xs={4} lg={4}> {t("day.friday")}:   </DayGrid> 
         <TimeGrid item xs={8} lg={8}> {filteredData.Friday} </TimeGrid></> : null}

         {filteredData.Satuday ? <>  
         <DayGrid item xs={4} lg={4}> {t("day.saturday")}:   </DayGrid> 
         <TimeGrid item xs={8} lg={8}> {filteredData.Satuday} </TimeGrid></> : null}

         {filteredData.Sunday ? <>  
         <DayGrid item xs={4} lg={4}> {t("day.sunday")}:   </DayGrid> 
         <TimeGrid item xs={8} lg={8}> {filteredData.FridaSundayy} </TimeGrid></> : null}

         </Container>
      ))}
    </>
  );
}
