import React, { useEffect, useContext } from "react";
import { UserContext } from "../Components/Utils/UserContext";
import styled from "styled-components";

import Dashboard from "./Dashboard";
import Login from "../Components/Landing/Login";
import PayoutComponent from "../Components/DynamicContent/PayoutComponent";
import Grid from "@material-ui/core/Grid";
import img from "../Back.jpg";
import darkImg from "../BackDark.jpg";

const Kontejner = styled.div`
  text-align: center;
  color: ${(props) => props.theme.background};
  background-image: url(${img});
  background-repeat: no-repeat;
`;

const LoginContainer = styled.div`
  width: 1200px;
`;

const InfoGrid = styled(Grid)`
  @media screen and (max-width: 700px) {
    display: none;
  }
`;

export default function Home() {
  const { isAuth, setIsAuth } = useContext(UserContext);
  const token = localStorage.getItem("token");
  const checkAuth = () => {
    if (token) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Kontejner>
      {/* If logged in, show dashboard */}
      {isAuth === true ? (
        <Dashboard />
      ) : (
        // If not, show Login/Registered from
        <div>
          <Grid container spacing={3}>
            <InfoGrid item xs={12} sm={12} md={12} lg={6}>
              <PayoutComponent branch={"1"} />
            </InfoGrid>

            <Grid item xs={12} sm={12} md={12} lg={6}>
              <LoginContainer>
                <Login />
              </LoginContainer>
            </Grid>
          </Grid>
        </div>
      )}
    </Kontejner>
  );
}
