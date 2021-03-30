import React, { useState } from "react";
import { Route, Switch, Redirect, Link } from "react-router-dom";
import {useTranslation } from "react-i18next";
import styled from "styled-components";

import ProtectedRoute from './Components/Utils/ProtectedRoute'
import {UserContext } from './Components/Utils/UserContext'
import {BranchContext } from './Components/Utils/BranchContext'

import Components from "./Pages/Components";
import Footer from "./Components/Navigation/Footer";
import Header from "./Components/Navigation/Header";
import ResetPassword from "./Pages/ResetPassword";
import CreateReservation from "./Pages/CreateReservation";
import Reservations from "./Pages/Reservations";
import Profile from './Pages/Profile'
import Home from './Pages/Home'

import { createGlobalStyle, ThemeProvider } from "styled-components";
import { theme} from "./Themes/theme";
import {HeartIcon} from './Components/Icons/Icons'

import Grid from "@material-ui/core/Grid";

// Overriding Material UI with styled component
const MainGrid = styled(Grid)`
    background-color: inherit;
    justify-self: center;
    justify-content: center;
`
const Main = styled.div`
    background-color: inherit;
    margin-top: 3%;
    min-height: 700px;
    margin-left: 1rem;
    display: flex;
    justify-self: center;
    justify-content: center;
    @media screen and (max-width: 700px) {
      margin-left: 0;
     }
`

const StyledLink = styled(Link)`
  text-decoration: none;
  margin-left: 2rem;
  cursor: pointer;
`;

const GridFooter = styled(Grid)`
  background: ${(props) => props.theme.Primitive.Shade};
  height: 100%;
  position: sticky;
  z-index: 5;
  bottom: 0;
  @media screen and (min-width: 700px) {
      display: none;
     }
  `
const LangButton = styled.button`
  margin-top: 4%;
  background: inherit;
  outline:none;
  font-family: Roboto;
  border:none;
  font-size: 15px;
  cursor: pointer;
  &:hover{
        transition-duration: 0.2s;
        color: ${(props) => props.theme.Primary.Main};
        font-weight: 800;
    }
`

// Global background and styling
const GlobalStyle = createGlobalStyle`
  body {
    background: rgba(230, 242, 239, 0.7);
  }
  h1, a, div{
    color: ${(props) => props.theme.colors.text};
    max-width: 100%
  }
  .div{
    box-shadow: 0 2px 8px 0 ${(props) => props.theme.colors.shadow};
  }
`;

function App() {
  
  // Setting Auth to put in Context for whole application
  const [isAuth, setIsAuth] = useState(false);
  const [branch, setBranch] = useState(null)
  // Toggle theme mode
  const themeMode =  theme

  const {i18n} = useTranslation()
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  }

  return (
    <div>
      {/* Apply visual theme, global style and Context for Auth */}
      <ThemeProvider theme={themeMode}>
        <GlobalStyle />
          <UserContext.Provider value={{isAuth, setIsAuth}}>
           <BranchContext.Provider value={{branch, setBranch}}>
              <MainGrid container spacing={0}>
                <Grid item xs={12}>
                  <div>
                {/* Do not Show header if not logged in */}
                {isAuth === true ?   <Header/>  :                   
                <Grid container spacing={1}>    
                <Grid item xs={9} lg={9}>        
                <StyledLink to='/'><HeartIcon/><i>Powered by PlasmaStream</i></StyledLink>
                    </Grid>
                   {/* Possible to change language only locally on main page. */} 
                    {process.env.REACT_APP_MULTILANGUAGE === '1' ? 
                          <Grid item xs={3} lg={3}>
                          {isAuth === false ? <div>
                        <LangButton  onClick={() => {changeLanguage("cz"); }}>
                          CZ
                        </LangButton>           
                        <LangButton  onClick={() => {changeLanguage("en");}} >
                          EN
                        </LangButton> </div>: null} 
                        </Grid>  : null}   
                        </Grid>}  
                    </div>
                </Grid>
                {/* Main page component router */}
                <Grid  item xs={12} sm={11} m={11} >
                  <Main>
                    <Switch>
                      <ProtectedRoute exact path="/reservations" component={Reservations} isAuth={isAuth} />
                      <Route exact path="/" render={() => <Home />} isAuth={isAuth} />
                      <Route exact path="/resetPassword" component={ResetPassword} />
                      <Route exact path="/components" component={Components} />
                      <ProtectedRoute exact path="/profile" component={Profile} isAuth={isAuth} />
                      <ProtectedRoute exact path="/createReservation" component={CreateReservation} isAuth={isAuth} />
                      {/* Redirect any other routest */}
                      <Route render={() => <Redirect to="/" />} />
                    </Switch>
                  </Main>
                </Grid>
                {/* Footer, mobile navigation if logged in. Contact information if not logged */}
                <GridFooter  item xs={12} sm={12} m={12}>
                {isAuth === true ?      
                <Footer/>  :   null}         
                 </GridFooter> 
              </MainGrid>
            </BranchContext.Provider>
          </UserContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
