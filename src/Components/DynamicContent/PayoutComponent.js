
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";

const HeartSvg = <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.95154 0.5C1.13303 0.5 0.0170898 2.09032 0.0170898 3.39474C0.0170898 6.21526 3.22291 8.83333 5.48584 10.5C7.74877 8.83333 10.9546 6.21526 10.9546 3.39474C10.9546 2.09032 9.83865 0.5 8.02014 0.5C7.00452 0.5 6.13688 1.30972 5.48584 2.07895C4.8348 1.30972 3.96715 0.5 2.95154 0.5Z" fill="#FA6966"/>
</svg>

const DollarSvg = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.47998 2 2 6.48 2 12C2 17.52 6.47998 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59003 20 4 16.41 4 12C4 7.59 7.59003 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM9.96997 9.47C9.96997 10.2 10.54 10.69 12.31 11.14C14.07 11.6 15.96 12.36 15.97 14.56C15.96 16.17 14.7599 17.04 13.24 17.33V19H10.9V17.3C9.39996 16.99 8.13995 16.03 8.03998 14.33H9.75995C9.84998 15.25 10.48 15.97 12.08 15.97C13.79 15.97 14.18 15.11 14.18 14.58C14.18 13.86 13.79 13.17 11.84 12.71C9.66998 12.19 8.17999 11.29 8.17999 9.5C8.17999 7.99001 9.38995 7.00999 10.9 6.69V5H13.23V6.71001C14.85 7.11 15.67 8.34 15.72 9.67999H14.0099C13.97 8.7 13.45 8.03999 12.07 8.03999C10.7599 8.03999 9.96997 8.63 9.96997 9.47Z" fill="black" fill-opacity="0.54"/>
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
`

const Payout = styled.div`
    background: rgba(255,255,255, 0.7);
    margin-top: 20%;
    border-top: 10px solid ${(props) => props.theme.Primary.Main};
    box-shadow: 12px 16px 40px rgba(0, 72, 102, 0.05);
`

const PayoutTitleRow = styled.div`
  font-weight: bold;
  font-size: 20px;
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
            <Grid item xs={12}><PayoutTitleRow>{DollarSvg}Financial rewards</PayoutTitleRow></Grid>
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
