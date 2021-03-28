import React from "react";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";

import WorkingHours from "../Components/DynamicContent/WorkingHours";
import DashboardLocation from "../Components/PageComponents/Dashboard/DashboardLocation";
import DashboardContact from "../Components/PageComponents/Dashboard/DashboardContact";
import NextVisit from "../Components/PageComponents/Dashboard/NextVisit";
import UpcomingReservation from "../Components/PageComponents/Dashboard/UpcomingReservation";

const Kontejner = styled.div`
  position: relative;
  z-index: 3;
  margin: 10px;
  @media screen and (max-width: 700px) {
    margin: 0px;
    padding-left: 10px;
    text-align: left;
  }
`;

const GridContainer = styled(Grid)`
  text-align: left;
`;

const DashboardDiv = styled.div`
  @media screen and (max-width: 700px) {
    margin-top: 2%;
    margin-bottom: 2%;
  }
`;

const MyGrid = styled(Grid)`
  position: relative;
  z-index: 3;
`;

const CircleSmall = styled.circle`
  position: fixed;
  z-index: 2;
  border-radius: 50%;
  width: 400px;
  height: 400px;
  left: 70%;
  top: 55%;
  background: radial-gradient(
    closest-side,
    #2ec5ce,
    #2ec5ce,
    rgba(230, 242, 239, 0.7)
  );
  opacity: 0.1;
  filter: blur(10px);
  -webkit-filter: blur(8px);
`;

const CircleLarge = styled.circle`
  position: fixed;
  z-index: 2;
  border-radius: 50%;
  width: 1200px;
  height: 1200px;
  left: -45%;
  top: 0%;
  background: radial-gradient(
    closest-side,
    #2ec5ce,
    #2ec5ce,
    rgba(230, 242, 239, 0.7)
  );
  opacity: 0.1;
  filter: blur(10px);
  -webkit-filter: blur(8px);
`;

const Flex = styled.div`
  display: flex;
  background: #ffffff;
  box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.05);
  border-radius: 16px;
  margin: 10px;
  width: 100%;
`;


export default function Dashboard() {
  const branch = localStorage.getItem("defaultSubcenter");

  return (
    <Kontejner>
      {/* Top part */}
      <CircleSmall />
      <CircleLarge />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12}>
          <NextVisit />
        </Grid>
      </Grid>
      <DashboardDiv>
        {/* Left part */}

        <GridContainer container spacing={2}>
          {/* Subcenter working hours */}
          <MyGrid item xs={12} sm={12} md={7}>
              <Flex>
                <UpcomingReservation />
              </Flex>
              <Flex>
                <WorkingHours branch={branch} />
              </Flex>
          </MyGrid>

          {/* Subcenter location */}
          <MyGrid item xs={12} sm={12} md={5}>
            <Flex>
                <DashboardContact branch={branch} />
              </Flex>
              <Flex>
                <DashboardLocation branch={branch} />
              </Flex>
              <Flex>
                <WorkingHours branch={branch} />
              </Flex>
          </MyGrid>
        </GridContainer>
      </DashboardDiv>
    </Kontejner>
  );
}
