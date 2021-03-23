
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import branchEnum from '../../enums/branches.json'

import {MailIcon, PhoneIcon} from '../Icons/Icons'


const Container = styled.div`
 margin-top: 80px;
 margin-left: 2%;
 padding-bottom: 50px;
`
const ContactText = styled.a`
  margin-left: 2%;
`


export default function InfoTable1({branch}) {
  const { t } = useTranslation();
  return (
    <>

      {branchEnum.data.filter(data => data.id == branch).map(filteredData => (
        <Container>

          {filteredData.phone ? <>  
         <p>  <PhoneIcon/> <ContactText>{filteredData.phone} </ContactText>  </p></> : null}

         {filteredData.email ? <>  
          <p>  <MailIcon/> <ContactText>{filteredData.email} </ContactText>  </p></> : null}
         </Container>

      ))}


    </>
  );
}
