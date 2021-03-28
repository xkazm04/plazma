import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid"
import branchEnum from '../../../enums/branches.json'
import { LocationIcon } from '../../Icons/Icons';
import TitleDash from '../../Texts/TitleDash'

const Container = styled.div`
  margin-top: 80px;
  margin-left: 2%;
  padding-bottom: 20px;
`
const ContentGrid = styled(Grid)`
  font-family: Roboto;
  font-size: 16px;
  padding: 5px;
  @media screen and (max-width: 1000px) {
    font-size: 14px;
     }
`

export default function DashboardLocation({branch}) {
  const { t } = useTranslation();
  return (
    <>
    <TitleDash title={t("dashboardTitle_location")}   icon={<LocationIcon/>}/>
      {branchEnum.data.filter(data => data.id === branch).map(filteredData => (
        <Container container spacing={0}>
          {filteredData.address ? <>  
         <ContentGrid item xs={9} lg={9}> {filteredData.address} </ContentGrid></> : null}
         </Container>
      ))}
    </>
  );
}
