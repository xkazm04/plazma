import { useContext } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";

import { UserContext } from "../Utils/UserContext";
import MenuButton from "../Buttons/MenuButton";
import styled from "styled-components";
import branchEnum from '../../enums/branches.json'
import {HeartIcon, ProfileIcon} from '../Icons/Icons'
import ReactTooltip from 'react-tooltip';


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
`

const StyledLink = styled(Link)`
  text-decoration: none;
  margin: 0.3rem;
`;




export default function Header() {
  const { t } = useTranslation();
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
      <HeaderCenter>
      {branchEnum.data.filter(data => data.id === branch).map(filteredData => (
        <div>
          {filteredData.welcome ? <>  
           {filteredData.welcome}
          </> : null}
         </div>
      ))}
      </HeaderCenter>
      {/* Right menu part */}
      <HeaderRight>
        <Link  to="/">
          <MenuButton width={"3rem"} label={<HeartIcon/>} />
        </Link>
        <Link data-tip={t("tooltip_profile")} t  to="/profile">
           <ReactTooltip />
          <MenuButton width={"3rem"} label={<ProfileIcon />} />
        </Link>
        <Link data-tip={"ResetPasswordTest"} to="/resetPassword">
        <ReactTooltip  />
          <MenuButton width={"3rem"} label={'reset'}  onClick={handleLogout}/>
        </Link>
        <Link data-tip={t("tooltip_logout")} to="/">
            <ReactTooltip /> 
            <MenuButton  
              width={"3rem"}
              label={<PowerSettingsNewIcon />}
              onClick={handleLogout}
            />
        </Link>
      </HeaderRight>
    </Kontejner>
  );
}
