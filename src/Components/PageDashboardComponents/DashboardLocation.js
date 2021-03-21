

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


export default function DashboardLocation({branch}) {
  const { t } = useTranslation();
  return (
    <>

      {branchEnum.data.filter(data => data.id == branch).map(filteredData => (
        <Container container spacing={0}>

          {filteredData.address ? <>  
         <TitleGrid item xs={3} lg={3}> Address:   </TitleGrid> 
         <ContentGrid item xs={9} lg={9}> {filteredData.address} </ContentGrid></> : null}

         </Container>

      ))}


    </>
  );
}
