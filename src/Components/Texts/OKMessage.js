import React from 'react'
import styled from 'styled-components'

const StyledTitle = styled.h1` 
    padding: 1rem 1.5rem;
    font-family: Roboto;
    font-size: 1.2rem;
    outline: none;
    color: ${(props) => props.theme.Primary.Dark};
    background-color: ${(props) => props.theme.Primary.Shade};
    border-radius: 10px;
    @media screen and (max-width: 700px) {
     font-size: 1rem;
  }
`



const Title = ({title}) => {
return  <StyledTitle>{title}</StyledTitle>;
};

export default Title
