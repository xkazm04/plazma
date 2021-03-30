import React, { useEffect, useContext } from "react";
import { UserContext } from "../Components/Utils/UserContext";
import { BranchContext } from "../Components/Utils/BranchContext";
import styled from "styled-components";

import Dashboard from "./Dashboard";
import Login from "../Components/PageComponents/Home/Login";
import PayoutComponent from "../Components/DynamicContent/PayoutComponent";

import Grid from "@material-ui/core/Grid";

const Kontejner = styled.div`
  text-align: center;
  background-repeat: no-repeat;
`;

const LoginContainer = styled.div`
  width: 1200px;
`

const WelcomeGrid = styled(Grid)`
  background: white;
`

export default function Home() {
  const { isAuth, setIsAuth } = useContext(UserContext);
  const { branch, setBranch } = useContext(BranchContext);
  const token = localStorage.getItem("jwt");
  const contextBranch = localStorage.getItem('defaultSubcenterId')

  // Show Dashboard if IsAuth and Branch known
  const checkAuth = () => {
    if (token) {
      setIsAuth(true);
      setBranch(contextBranch)
    } else {
      setIsAuth(false);
      setBranch(null)
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
          <WelcomeGrid container spacing={0}>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <PayoutComponent branch={branch} />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={6}>
              <LoginContainer>
                <Login />
              </LoginContainer>
            </Grid>
          </WelcomeGrid>
      )}
    </Kontejner>
  );
}
