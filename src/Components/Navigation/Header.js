import { useContext } from "react";
import { Link } from "react-router-dom";

import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import { UserContext } from "../Utils/UserContext";
import MenuButton from "../Buttons/MenuButton";
import styled from "styled-components";
import branchEnum from '../../enums/branches.json'
import {HeartIcon} from '../Icons/Icons'


// Header for desktop primary
const Kontejner = styled.div`
    padding-top: 1%;
    display: flex;
    flex-direction: row;
    padding-bottom: 1%;
    padding-right: 2%;
    margin-bottom: 1%;
    background: white;
    width: 100%;
    position: sticky;
    top: 0;
    @media screen and (max-width: 700px) {
      position: fixed;
      background: inherit;
      flex-direction: row-reverse;
      top: 2%;
      right: 5%;
  }
`

const HeaderCenter = styled.div`
    flex-grow: 1;
    margin-top: 1rem;
    font-size: 20px;
    @media screen and (max-width: 700px) {
      display: none;
  }
`

const HeaderLeft = styled.div`
    flex-grow: 1;
    justify-self: left;
    text-align: left;
    padding-left: 2%;
    text-decoration: none;
    @media screen and (max-width: 700px) {
      display: none;
  }
`

const HeaderRight = styled.div`
    transition-duration: 1s;
    text-decoration: none;
    text-align: right;
    &:hover{
      color: red;
    }
    @media screen and (max-width: 700px) {
      display: none;
  }
`

const StyledLink = styled(Link)`
  text-decoration: none;
  margin: 0.3rem;
`;

const MobileLogout = styled.div`
      @media screen and (min-width: 700px) {
      display: none;
      }
`



export default function Header() {
  const { isAuth, setIsAuth } = useContext(UserContext);
  const branch = localStorage.getItem("defaultSubcenter");

  // Logout function, clean browser
  const handleLogout = () => {
    setIsAuth(false);
    console.log(isAuth);
    localStorage.removeItem("defaultSubcenter");
    localStorage.removeItem("jwt");
    localStorage.removeItem("donorCode");
    localStorage.removeItem("theme");
  };

  return (
    <Kontejner>
      {/* Left logo part */}
      <HeaderLeft>
        {/* Logo with changes based on branch where are we situated */}
        <StyledLink to="/">
          {branchEnum.data.filter(data => data.id === branch).map(filteredData => (
        <div>
          {filteredData.logoText ? <>  
            <img src={filteredData.logoIcon} alt='logo' /> 
            <i> {filteredData.logoText}</i>
          </> : null}
         </div>
      ))}
        </StyledLink>
      </HeaderLeft>
      {/* Center part with specific branch message*/}
      <HeaderCenter>{branch}</HeaderCenter>
      {/* Right menu part */}
      <HeaderRight>
        <Link  to="/">
          <MenuButton width={"3rem"} label={<HeartIcon/>} />
        </Link>
        <Link to="/profile">
          <MenuButton width={"3rem"} label={<AccountCircleIcon />} />
        </Link>
        <Link to="/resetPassword">
          <MenuButton width={"3rem"} label={'reset'}  onClick={handleLogout}/>
        </Link>
        <MenuButton
          width={"3rem"}
          label={<PowerSettingsNewIcon />}
          onClick={handleLogout}
        />
      </HeaderRight>
      {/* Logout option only for small resolution display */}
      <MobileLogout>      
        <MenuButton
          width={"3rem"}
          label={<PowerSettingsNewIcon />}
          onClick={handleLogout}
        /> 
      </MobileLogout>

    </Kontejner>
  );
}
