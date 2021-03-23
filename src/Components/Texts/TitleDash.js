import React from 'react'
import styled from 'styled-components'

const StyledTitle = styled.h1` 
    font-family: Inter;
    font-size: 18px;
    position: absolute;
    margin-left: 3%;
    margin-top: 5%;
    font-weight: 600;
    outline: none;
    color: ${(props) => props.theme.colors.font.paragraphText};
    text-decoration:  ${props => props.theme.colors.text};
    @media screen and (max-width: 700px) {
     font-size: 1rem;
  }
`

const Space = styled.a`
  padding: 5px;
`

const DashTitle = ({title,icon}) => {
return  <StyledTitle>{icon}<Space/>{title}</StyledTitle>;
};

export default DashTitle
