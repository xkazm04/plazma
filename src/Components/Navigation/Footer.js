import { useState } from "react";
import {Link} from 'react-router-dom'
import styled from "styled-components";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import DateRangeIcon from "@material-ui/icons/DateRange";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";

const FooterNavigation = styled(BottomNavigation)`
  background: ${(props) => props.theme.Primitive.Shade};
`;

const MyBottomNavigationAction = styled(BottomNavigationAction)`
  background: ${(props) => props.theme.Primitive.Shade};
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  margin-left: 2rem;
  cursor: pointer;
`;

export default function Footer() {
  const [value, setValue] = useState(0);

  return (
    <>
      <FooterNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <StyledLink to='/'> <MyBottomNavigationAction icon={<DateRangeIcon />} /></StyledLink>
        <StyledLink to='/profile'><MyBottomNavigationAction icon={<PermIdentityIcon />} /></StyledLink>
      </FooterNavigation>
    </>
  );
}
