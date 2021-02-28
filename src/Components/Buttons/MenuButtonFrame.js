import React from "react";
import styled from "styled-components";


const StyledCircle = styled.div`
  position: relative;
  text-align: center;
  margin-bottom: 1rem;
  height: 45px;
  width: 45px;
  border-radius: 25px;
  background-color: ${(props) => props.menuCircleColor || "ED1B2"};
  transition-duration: 0.4s;
  &:hover {
    background-color: ${(props) => props.menuCircleColorHover};
    cursor: pointer;
  }
`;


const Icon = styled.div`
    padding-top: 5px;
`

const Title = styled.p`
  color: ${(props) => props.menuCircleColor || "red"};
  text-align: center;
  padding: 0;
  transition-duration: 0.4s;
  &:hover {
    color: ${(props) => props.menuCircleColorHover};
    cursor: pointer;
  }
`

const MenuButtonFrame = ({ menuCircleColor,menuCircleColorHover, svgIcon, title }) => {
  return (
      <StyledCircle menuCircleColorHover={menuCircleColorHover}>
        <Icon>{svgIcon}</Icon>
        {/* <Title menuCircleColor={menuCircleColor}   menuCircleColorHover={menuCircleColorHover}>{title}</Title> */}
        </StyledCircle>
  );
};

export default MenuButtonFrame;
