
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";

const HeartSvg = <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.95154 0.5C1.13303 0.5 0.0170898 2.09032 0.0170898 3.39474C0.0170898 6.21526 3.22291 8.83333 5.48584 10.5C7.74877 8.83333 10.9546 6.21526 10.9546 3.39474C10.9546 2.09032 9.83865 0.5 8.02014 0.5C7.00452 0.5 6.13688 1.30972 5.48584 2.07895C4.8348 1.30972 3.96715 0.5 2.95154 0.5Z" fill="#FA6966"/>
</svg>

const DollarSvg = <svg width="35" height="41" viewBox="0 0 35 41" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0)">
<path d="M17.0025 1.09881e-08C7.61203 1.09881e-08 0 7.34261 0 16.4C0 25.4571 7.61203 32.8 17.0025 32.8H34.0051V16.4C34.0051 7.34261 26.3923 -0.000327989 17.0025 1.09881e-08ZM26.8409 25.8897C21.4072 31.1311 12.5979 31.1311 7.16419 25.89C1.73052 20.6489 1.73052 12.1514 7.16419 6.9103C12.5979 1.66919 21.4072 1.66919 26.8409 6.9103C32.2749 12.1511 32.2745 20.6486 26.8409 25.8897Z" fill="#0D9032"/>
<path d="M18.8058 14.6681C17.0609 14.0151 16.3425 13.5865 16.3425 12.9129C16.3425 12.3414 16.7736 11.7699 18.1077 11.7699C19.5858 11.7699 20.5299 12.2393 21.0637 12.464L21.6587 10.1575C20.9816 9.83092 20.0579 9.54488 18.6824 9.48386V7.6875H16.6709V9.62643C14.4744 10.0551 13.2019 11.4636 13.2019 13.2599C13.2019 15.2399 14.7004 16.2606 16.8969 16.9955C18.416 17.506 19.0728 17.9953 19.0728 18.7713C19.0728 19.5878 18.272 20.037 17.1022 20.037C15.7681 20.037 14.557 19.6083 13.6949 19.1386L13.0789 21.5267C13.8589 21.9759 15.1931 22.3432 16.5685 22.4042V24.3438H18.5804V22.2616C20.9409 21.8533 22.2341 20.3022 22.2341 18.4853C22.2338 16.6481 21.2484 15.5257 18.8058 14.6681Z" fill="#0D9032"/>
</g>
<defs>
<clipPath id="clip0">
<rect width="34.0051" height="41" fill="white"/>
</clipPath>
</defs>
</svg>


const Kontejner = styled.div`
  display: flex;
      position: relative;
      flex-direction: column;
      text-align: left;
      margin-left: 5%;
      margin-bottom: 2%;
      margin-top: 10%;
  @media screen and (max-width: 700px) {
     margin-left: 5%;
  }
`

const Welcome = styled.div`
    background: rgba(255,255,255, 0.7);
    margin-top: 5%;
    padding-left: 5%;
    font-weight: 700;
    font-family: Roboto;
    font-size: 20px;
`

const Payout = styled.div`
    background: rgba(255,255,255, 0.7);
    margin-top: 20%;
    border-top: 10px solid ${(props) => props.theme.Primary.Main};
    box-shadow: 12px 16px 40px rgba(0, 72, 102, 0.05);
`

const PayoutTitleRow = styled.div`
  font-weight: 500;
  font-family: Roboto;
  font-size: 28px;
  margin-top: 2%;
  margin-bottom: 3%;
`


const Collection = styled.p`
  color: #0B3A3D;
  margin-top: 5px;
  font-weight: bold;
`

const Amount = styled.p`
  color: #0B3A3D;
  margin-top: 5px;
`

const MyGrid = styled(Grid)`
  margin-left: 5%;
  margin-bottom: 2%;
  max-width: 80%;
  border-bottom: 1px solid #EAEAEA;
;
`

export default function RegistrationContent({ branch }) {


  return (
    <Kontejner>
        <Welcome>
        
      <h1>Be A Hero - It's in your blood</h1>

        </Welcome>
        <Payout>
          <MyGrid container spacing={1}>
            <Grid item xs={12}><PayoutTitleRow>{DollarSvg} Financial rewards</PayoutTitleRow></Grid>
              <Grid item xs={3} sm={3} md={3}><Collection>1st collection</Collection></Grid>
            <Grid item xs={9} sm={9} md={9}><Amount>{HeartSvg}deposit 400 Kč from amount 700 Kč</Amount></Grid>
          </MyGrid>
          <MyGrid container spacing={1}>
              <Grid item xs={3} sm={3} md={3}><Collection>2nd collection</Collection></Grid>
            <Grid item xs={9} sm={9} md={9}><Amount>{HeartSvg}{HeartSvg}deposit 400 Kč from amount 700 Kč</Amount></Grid>
          </MyGrid>
          <MyGrid container spacing={1}>
              <Grid item xs={3} sm={3} md={3}><Collection>3rd collection</Collection></Grid>
            <Grid item xs={9} sm={9} md={9}><Amount>{HeartSvg}{HeartSvg}{HeartSvg}deposit 400 Kč from amount 700 Kč</Amount></Grid>
          </MyGrid>
        </Payout>

    </Kontejner>
  );
}
