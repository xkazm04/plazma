import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import {useTranslation } from "react-i18next";
import styled from "styled-components";

import ProtectedRoute from './Components/Utils/ProtectedRoute'
import {UserContext } from './Components/Utils/UserContext'

import Header from "./Components/PageCoreComponents/Header";
import ResetPassword from "./Pages/ResetPassword";
import CreateReservation from "./Pages/CreateReservation";
import Reservations from "./Pages/Reservations";
import Profile from './Pages/Profile'
import Home from './Pages/Home'
import ToggleLanguage from './Components/Buttons/ToggleLanguage'

import { createGlobalStyle, ThemeProvider } from "styled-components";
import { theme} from "./Themes/theme";
import {HeartIcon} from './Components/Icons/Icons'

import Grid from "@material-ui/core/Grid";
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import DateRangeIcon from '@material-ui/icons/DateRange';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';

import back from './Back.jpg'; 



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
`

const ImageBackground = styled.div`
  background: url(${back});
  position: absolute;
`

const StyledLink = styled.a`
  text-decoration: none;
  margin: 0.3rem;
`;

const Footer = styled(Grid)`
  background: ${(props) => props.theme.Primitive.Shade};
  height: 100%;
  position: sticky;
  z-index: 5;
  bottom: 0;
  @media screen and (min-width: 700px) {
      display: none;
     }
  `

const FooterNavigation = styled(BottomNavigation)`
  background: ${(props) => props.theme.Primitive.Shade};
`

const MyBottomNavigationAction = styled(BottomNavigationAction)`
   background: ${(props) => props.theme.Primitive.Shade};
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
  const [ln, setLen] = useState('en')
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
              <MainGrid container spacing={3}>
                <ImageBackground/>
                <Grid item xs={12}>
                  <div>
                {/* Do not Show header if not logged in */}
                {isAuth === true ?   <Header />  :                   
                <Grid container spacing={1}>    
                <Grid item xs={9} lg={9}>        
                <StyledLink><HeartIcon/><i>PlasmaStream</i></StyledLink>
                    </Grid>
                      <Grid item xs={3} lg={3}>
                         {/* Change language - CZ,EN */} 
                  {isAuth === false ? <div>
                     <LangButton  onClick={() => {changeLanguage("cz"); }}>
                      CZ
                    </LangButton>           
                    <LangButton  onClick={() => {changeLanguage("en");}} >
                      EN
                    </LangButton> </div>: null}
                    </Grid>
                    </Grid>}       
                    </div>
                </Grid>
                {/* Content component */}
                
                <Grid  item xs={12} sm={11} m={11} >
                  <Main>
                    <Switch>
                      <ProtectedRoute exact path="/reservations" component={Reservations} isAuth={isAuth} />
                      <Route exact path="/" render={() => <Home />} isAuth={isAuth} />
                      <Route exact path="/resetPassword" component={ResetPassword} />
                      <ProtectedRoute exact path="/profile" component={Profile} isAuth={isAuth} />
                      <ProtectedRoute exact path="/createReservation" component={CreateReservation} isAuth={isAuth} />
                      {/* Redirect any other routest */}
                      <Route render={() => <Redirect to="/" />} />
                    </Switch>
                  </Main>
                </Grid>
                {/* Footer, mobile navigation if logged in. Contact information if not logged */}
                <Footer  item xs={12} sm={12} m={12}>
                {isAuth === true ?                   <FooterNavigation showLabels  >
                <MyBottomNavigationAction label={<FavoriteBorderIcon/>} />
                <MyBottomNavigationAction label={<DateRangeIcon/>}  />
                 <MyBottomNavigationAction label={<PermIdentityIcon/>}/>
                </FooterNavigation> :   null}         

                 </Footer> 
              </MainGrid>
          </UserContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
