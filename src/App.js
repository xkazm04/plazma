import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import ProtectedRoute from './Components/Utils/ProtectedRoute'
import {UserContext } from './Components/Utils/UserContext'

import Header from "./Components/CoreComponents/Header";
import ResetPassword from "./Pages/ResetPassword";
import Reservations from "./Pages/Reservations";
import Profile from './Pages/Profile'
import Home from './Pages/Home'

import { createGlobalStyle, ThemeProvider } from "styled-components";
import { theme} from "./Themes/theme";
import styled from "styled-components";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ToggleButton from '@material-ui/lab/ToggleButton';
import TwoWheelerSharpIcon from '@material-ui/icons/TwoWheelerSharp';
import FlashOn from '@material-ui/icons/FlashOn';
import {useTranslation } from "react-i18next";


const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: "inherit",
    justifySelf: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: "inherit",
    marginLeft: '1.1rem',
  },
  main: {
    backgroundColor: "inherit",
    minHeight: "700px",
    marginLeft: '1rem',
    display: 'flex',
    justifySelf: 'center',
    justifyContent: 'center',
    
  },
}));

// Overriding Material UI with styled component

const Czech = styled(FlashOn)`
  color: ${(props) => props.theme.colors.shadow};
`
const English = styled(TwoWheelerSharpIcon)`
  color: ${(props) => props.theme.colors.shadow};
`

const DarknessButton = styled(ToggleButton)`
  background-color: 'none'; 
`

const MyPaper = styled(Paper)`
  box-shadow: 0 2px 8px 0 ${(props) => props.theme.colors.shadow};
  color: ${(props) => props.theme.colors.text};
  background: linear-gradient(5deg, 
       ${props => props.theme.colors.gradient.first},
        ${props => props.theme.colors.gradient.second}
        );
`;


const GlobalStyle = createGlobalStyle`
  body {
   background-color: ${(props) => props.theme.colors.main};
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
  const [selected, setSelected] = useState(false);
  const themeMode =  theme
  const classes = useStyles();

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
              <Grid container className={classes.container} spacing={3}>
                <Grid item xs={12}>
                  {/*  */}
                  <MyPaper className={classes.header}>
                {/* Do not Show header if not logged in */}
                {isAuth === true ?   <Header />  :   null}           
                
                {/* Change language - CZ,EN */} 
                {isAuth === false ? <div> <DarknessButton
                      value="check"
                      onChange={() => {
                        changeLanguage("cz");
                      }}
                    >
                      <Czech/>
                    </DarknessButton>             
                    <DarknessButton
                      value="check"
                      onChange={() => {
                        changeLanguage("en");
                      }}
                    >
                      <English/>
                    </DarknessButton>       </div>: null}
 
                  </MyPaper>
                </Grid>
                {/* Content component */}
                
                <Grid container item xs={12} sm={11} m={11} spacing={3}>
                  <MyPaper className={classes.main}>
                    <Switch>
                      <ProtectedRoute exact path="/reservations" component={Reservations} isAuth={isAuth} />
                      <Route exact path="/" render={() => <Home />} isAuth={isAuth} />
                      <Route exact path="/resetPassword" component={ResetPassword} />
                      <ProtectedRoute exact path="/profile" component={Profile} isAuth={isAuth} />
                      {/* Redirect any other routest */}
                      <Route render={() => <Redirect to="/" />} />
                    </Switch>
                  </MyPaper>
                </Grid>
              </Grid>
          </UserContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
