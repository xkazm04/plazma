import React, { useEffect, useContext } from "react";
import { UserContext } from "../Components/Utils/UserContext";
import styled from "styled-components";

import Dashboard from "./Dashboard";
import Login from "../Components/PageLandingComponents/Login";
import PayoutComponent from "../Components/DynamicContent/PayoutComponent";

import Grid from "@material-ui/core/Grid";

const Kontejner = styled.div`
  text-align: center;
  color: ${(props) => props.theme.blackwhite};
  background-repeat: no-repeat;
`;

const LoginContainer = styled.div`
  width: 1200px;
`

export default function Home() {
  const { isAuth, setIsAuth } = useContext(UserContext);
  const token = localStorage.getItem("jwt");
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
        // If not, show Welcome page with login form
        <div>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <PayoutComponent branch={"1"} />
            </Grid>

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
