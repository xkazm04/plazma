import React from 'react'
import styled from 'styled-components'

const StyledTitle = styled.h1` 
    padding: 1rem 1.5rem;
    font-size: 2.5vh;
    outline: none;
    color: ${props => props.theme.colors.text};
    @media screen and (max-width: 700px) {
     font-size: 2vh;
  }
`



const DashboardTitle = ({title}) => {
return  <StyledTitle>{title}</StyledTitle>;
};

export default DashboardTitle
