
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import {HeartIcon, Dots, MoneyIcon} from '../Icons/Icons'


const Kontejner = styled.div`
  display: flex;
      position: relative;
      flex-direction: column;
      text-align: left;
      margin-left: 5%;
      margin-bottom: 10%;
      margin-top: 1%;
      padding-left: 5%;
      
  @media screen and (max-width: 700px) {
     margin-left: 5%;
  }
`

const Welcome = styled.div`
    background: rgba(255,255,255);
    color: #0B3A3D;
    position: relative;
    z-index: 2;
    margin-top: 5%;
    padding-left: 5%;
    font-weight: 700;
    font-family: Roboto;
    font-size: 20px;
    @media screen and (max-width: 700px) {
      font-size: 14px;
  }
`
const PayoutBackground = styled.div`
  display: flex;
  justify-content: center;
`

const Payout = styled.div`
    position: relative;
    z-index: 2;
    background: rgba(255,255,255);
    margin-top: 20%;
    width: 100%;
    padding-left: 5%;
    border-top: 4px solid ${(props) => props.theme.Primary.Main};
    box-shadow: 12px 16px 40px rgba(0, 72, 102, 0.05);
    @media screen and (max-width: 700px) {
      display:none;
  }
`

const PayoutTitleRow = styled.div`
  font-weight: 500;
  font-family: Roboto;
  font-style: normal;
  font-size: 28px;
  margin-top: 2%;
  margin-bottom: 3%;
  padding-top: 5%;
  padding-bottom: 5%;
`



const Collection = styled.p`
  color: #0B3A3D;
  margin-top: 5px;
  font-weight: 700;
  font-family: Roboto;
  font-size: 18px;
`

const AmountText = styled.p`
  color: #0B3A3D;
  margin-top: 5px;
  font-weight: 400;
  font-family: Roboto;
  font-size: 18px;
`

const MyGrid = styled(Grid)`
  margin-left: 5%;
  margin-bottom: 2%;
  max-width: 80%;
  border-bottom: 1px solid #EAEAEA;
`

const LastGrid = styled(Grid)`
  margin-left: 5%;
  margin-bottom: 2%;
  max-width: 80%;
`

const Subtitle = styled.h2`
  font-weight: 300;
`

const DottedDivRight = styled.div`
  position: absolute;
  z-index: 1;
  top: 55%;
  left: 90%;
  @media screen and (max-width: 700px) {
      display:none;
  }
`

const DottedDivLeft = styled.div`
  position: absolute;
  z-index: 1;
  top: 87%;
  left: 0%;
  @media screen and (max-width: 700px) {
      display:none;
  }
`

const SubSub = styled.p`
  color: #ed3b9a;
`

// Additional text spacing 3%
const Space3 = styled.a`
  margin-left: 3%;
`


export default function RegistrationContent({ branch }) {


  return (
    <Kontejner>
        <Welcome>   
      <h1>Be A Hero - It's in your blood</h1>
      <Subtitle>PlasmaStream will make you happy</Subtitle>
      <SubSub>Because we care<Space3/><HeartIcon/></SubSub>

        </Welcome>
        <PayoutBackground>
        <DottedDivRight><Dots/></DottedDivRight>
        <DottedDivLeft><Dots/></DottedDivLeft>
        <Payout>
          <MyGrid container spacing={1}>
            <Grid item xs={12}><PayoutTitleRow><MoneyIcon/><Space3/>Přihlašovací údaje</PayoutTitleRow></Grid>
              <Grid item xs={3} sm={3} md={3}><Collection>Login</Collection></Grid>
            <Grid item xs={9} sm={9} md={9}><AmountText>donorapp</AmountText></Grid>
          </MyGrid>
          <LastGrid container spacing={1}>
              <Grid item xs={3} sm={3} md={3}><Collection>Heslo</Collection></Grid>
            <Grid item xs={9} sm={9} md={9}><AmountText>pass</AmountText></Grid>
          </LastGrid>
         {/* <DottedBox> <Dotted/></DottedBox> */}
        </Payout>
        </PayoutBackground>
    </Kontejner>
  );
}
