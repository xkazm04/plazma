import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import {useTranslation } from "react-i18next";

import ProtectedRoute from './Components/Utils/ProtectedRoute'
import {UserContext } from './Components/Utils/UserContext'

import Header from "./Components/PageCoreComponents/Header";
import ResetPassword from "./Pages/ResetPassword";
import Reservations from "./Pages/Reservations";
import Profile from './Pages/Profile'
import Home from './Pages/Home'

import { createGlobalStyle, ThemeProvider } from "styled-components";
import { theme} from "./Themes/theme";
import styled from "styled-components";

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
  min-height: 10vh;
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
  background: white;
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
const heartSvg = (
  <svg
    width="32"
    height="24"
    viewBox="0 0 25 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M8.44588 0C7.88613 0 7.43237 0.453765 7.43237 1.01351V16.4865C7.43237 17.0462 7.88613 17.5 8.44588 17.5C9.00563 17.5 9.45939 17.0462 9.45939 16.4865V1.01351C9.45939 0.453766 9.00563 0 8.44588 0ZM4.39193 0.625C3.83218 0.625 3.37842 1.07877 3.37842 1.63851V13.3615C3.37842 13.9212 3.83218 14.375 4.39193 14.375C4.95168 14.375 5.40545 13.9212 5.40545 13.3615V1.63851C5.40545 1.07877 4.95168 0.625 4.39193 0.625ZM0 5.38851C0 4.82877 0.453766 4.375 1.01351 4.375C1.57326 4.375 2.02703 4.82877 2.02703 5.38851V8.36149C2.02703 8.92123 1.57326 9.375 1.01351 9.375C0.453766 9.375 0 8.92123 0 8.36149V5.38851ZM25 5.38851C25 4.82877 24.5462 4.375 23.9865 4.375C23.4267 4.375 22.973 4.82877 22.973 5.38851V8.36149C22.973 8.92123 23.4267 9.375 23.9865 9.375C24.5462 9.375 25 8.92123 25 8.36149V5.38851ZM21.6216 1.63851C21.6216 1.07877 21.1678 0.625 20.6081 0.625C20.0483 0.625 19.5946 1.07877 19.5946 1.63851V13.3615C19.5946 13.9212 20.0483 14.375 20.6081 14.375C21.1678 14.375 21.6216 13.9212 21.6216 13.3615V1.63851ZM17.5676 1.01351C17.5676 0.453765 17.1139 0 16.5541 0C15.9944 0 15.5406 0.453766 15.5406 1.01351V16.4865C15.5406 17.0462 15.9944 17.5 16.5541 17.5C17.1139 17.5 17.5676 17.0462 17.5676 16.4865V1.01351ZM12.4998 2.5C11.9401 2.5 11.4863 2.95376 11.4863 3.51351V18.9865C11.4863 19.5462 11.9401 20 12.4998 20C13.0596 20 13.5134 19.5462 13.5134 18.9865V3.51351C13.5134 2.95377 13.0596 2.5 12.4998 2.5Z"
      fill="#ED1B2F"
    />
  </svg>
);


const GlobalStyle = createGlobalStyle`
  body {
   background-color: #F7F8F9;
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

  // Toggle theme mode
  const themeMode =  theme

  const {i18n} = useTranslation()
  const changeLanguage = (language) => {
    i18n.changeLanguage(language)
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
                <StyledLink >{heartSvg}<i>PlasmaStream</i></StyledLink>
                    </Grid>
                      <Grid item xs={3} lg={3}>
                         {/* Change language - CZ,EN */} 
                  {isAuth === false ? <div>
                     <LangButton value="check" onClick={() => {changeLanguage("cz"); }}>
                      cz
                    </LangButton>             
                    <LangButton value="check" onClick={() => {changeLanguage("en");}} >
                      en
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
