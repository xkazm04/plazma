import React from 'react'
import styled from 'styled-components'

const StyledTitle = styled.h1` 
    padding: 1rem 1.5rem;
    font-family: Roboto;
    font-size: 1.5rem;
    outline: none;
    color: ${(props) => props.theme.Secondary.Dark};
    background-color: #ffd9df;
    border-radius: 10px;
    @media screen and (max-width: 700px) {
     font-size: 1rem;
  }
`



const Title = ({title}) => {
return  <StyledTitle>{title}</StyledTitle>;
};

export default Title
