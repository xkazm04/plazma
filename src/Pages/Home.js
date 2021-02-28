import React, {useState, useContext} from 'react'
import { UserContext } from '../Components/Utils/UserContext'
import styled from 'styled-components'


import Login from '../Components/Landing/Login';
import RegisterNew from '../Components/Landing/RegisterNew';
import RegisterExisting from '../Components/Landing/RegisterExisting';
import Dashboard from './Dashboard';

import Title from '../Components/Texts/Title';
import ParagraphText from '../Components/Texts/ParagraphText';
import ToggleButton from "../Components/Buttons/ToggleButton";

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { useTranslation } from 'react-i18next';



const Kontejner = styled.div`
        text-align: center;
        background: linear-gradient(45deg, 
        ${props => props.theme.colors.main}, 
        ${props => props.theme.colors.gradient.second}
        );
`

const MySelect = styled(Select)` 
    margin: 0.5rem;
    background-color: ${props => props.theme.colors.input};
    color: ${props => props.theme.colors.text};
    position: relative;
    padding: .2rem;
    font-weight: bold;
    font-size: 0.8rem;
    text-align: center;
    border: 1px solid ${props => props.theme.colors.borderColor};
    border-radius: .5em;
    cursor: pointer;
    outline: none;
    min-width: 220px;
    transition-duration: 0.4s;
    font-family: Roboto;
    margin-bottom: 2rem;
    &:hover{
        background-color: ${props => props.theme.colors.main};
        border-bottom: none;
    }
`

const MyMenuItem = styled(MenuItem)`
    background-color: ${props => props.theme.colors.input};
    color: ${props => props.theme.colors.text};
    font-size: 0.8rem;
    &:hover{
        background-color: ${props => props.theme.colors.inputOption};
    }
    &:focus{
        background-color: ${props => props.theme.colors.inputOption};
         &:hover{
        background-color: ${props => props.theme.colors.inputOption};
      }
    }
`

export default function Home() {
  const { t } = useTranslation();
  const {isAuth, setIsAuth} = useContext(UserContext);
  
  // Toggling Login/Reservation forms
  const [formType, setFormType] = useState("login")
  const [activeRegisteredButton, setActiveRegisteredButton] = useState(false)
  const [activeRegisterExistingButton, setActiveRegisterExistingButton] = useState(false)
  const [activeLoginButton, setActiveLoginButton] = useState(true)
  const toggleFunction1 = () => {
        setActiveRegisteredButton(true);
        setActiveLoginButton(false);
        setActiveRegisterExistingButton(false);
        setFormType(("registerNew"))
  };

  const toggleFunction2 = () => {
    setActiveRegisteredButton(false);
    setActiveRegisterExistingButton(false);
    setActiveLoginButton(true);
    setFormType("login");
  }

  const toggleFunction3 = () => {
    setActiveRegisteredButton(false);
    setActiveLoginButton(false);
    setActiveRegisterExistingButton(true);
    setFormType(("registerExisting"));
  }

  // Choosing center
  const [branch, setBranch] = useState(null)
  const [open, setOpen] = useState(false);
  const locations = [
    {
      id: "1",
      locationName: "Prague",
    },
    {
      id: "2",
      locationName: "Kladno"
    },
    {
      id: "3",
      locationName: "Ostrava"
    }
  ]
  const handleChange = (event) => {
    setBranch(event.target.value);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  return (
    <Kontejner>
    {/* If logged in, show dashboard */}
    {isAuth === true ?   
    <Dashboard />  :       

// If not, show Login/Registered from
    <div>
        <div>
          <Title title={t('landing_welcome')}/>
          <ParagraphText content={t('landing_chooseBranchTitle')}/>
        </div>
        <div>
          {/* Choose Branch */}
        <MySelect
          open={open}
          value={branch}
          onChange={handleChange}
          displayEmpty
          onOpen={handleOpen}
          onClose={handleClose}
          defaultValue={t('landing_chooseBranchSelect')}
        >
          <MyMenuItem value={null}> <em>{t('chooseBranchSelect')}</em></MyMenuItem>
          {/* List all branches conming from axios */}
          {locations.map((loc) => (
        <MyMenuItem value={loc.id}>{loc.locationName}</MyMenuItem>
          ))}
        </MySelect>
        {/* Do not show Reservation form if branch did not selected */}
        
        {branch === null ? null :  <div>
              <ParagraphText content={t('chooseOption')}/>
              <ToggleButton label={t('registerNewOption')} width='15rem' active={activeRegisteredButton}  onClick={()=> {toggleFunction1()}}/>
              <ToggleButton label={t('registerExistingOption')} width='15rem' active={activeRegisterExistingButton}  onClick={()=> {toggleFunction3()}}/>
              <ToggleButton label={t('loginOption')}width='15rem' active={activeLoginButton}  onClick={()=> {toggleFunction2()}}/>
              </div>
              }

          </div>
          <div>
             {formType === 'login'  ?   <Login/>  :   formType === 'registerNew' ?  <RegisterNew branch={branch} /> : formType === 'registerExisting' ? <RegisterExisting/> : null    }  
             
             
        </div>
    </div> }
    </Kontejner>
  );
}
