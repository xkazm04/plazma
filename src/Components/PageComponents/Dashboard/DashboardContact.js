import { useTranslation } from "react-i18next";
import styled from "styled-components";
import branchEnum from '../../../enums/branches.json'
import {MailIcon, PhoneIcon} from '../../Icons/Icons'
import TitleDash from '../../Texts/TitleDash'

const Container = styled.div`
  margin-top: 50px;
  padding: 3%;
`
const ContactText = styled.a`
  margin-right: 10px;
`


export default function DashboardContact({branch}) {
  const { t } = useTranslation();
  return (
    <>
    <TitleDash title={t("dashboardTitle_contact")} />
      {branchEnum.data.filter(data => data.id === branch).map(filteredData => (
        <Container>

          {filteredData.phone ? <>  
         <p>  <PhoneIcon/> <ContactText/>{filteredData.phone}   </p></> : null}

         {filteredData.email ? <>  
          <p>  <MailIcon/> <ContactText/>{filteredData.email}   </p></> : null}
         </Container>
      ))}
    </>
  );
}
