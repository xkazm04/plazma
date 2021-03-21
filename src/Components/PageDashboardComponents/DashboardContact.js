
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid"
import branchEnum from '../../enums/branches.json'


const Container = styled.div`
 margin-top: 80px;
 margin-left: 30px;
 padding-bottom: 50px;
`
const TitleGrid = styled(Grid)`
  color: #858795;
  font-family: Roboto;
  font-size: 14px;
  padding: 5px;
`

const ContentGrid = styled(Grid)`
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

          {filteredData.phone ? <>  
         <TitleGrid item xs={3} lg={3}> Phone contact:   </TitleGrid> 
         <ContentGrid item xs={9} lg={9}> {filteredData.phone} </ContentGrid></> : null}

         {filteredData.email ? <>  
         <TitleGrid item xs={3} lg={3}> Email contact:   </TitleGrid> 
         <ContentGrid item xs={9} lg={9}> {filteredData.email} </ContentGrid></> : null}
         </Container>

      ))}


    </>
  );
}
