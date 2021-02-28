import React from 'react'
import styled from 'styled-components'

const StyledTitle = styled.h1` 
    padding: 1rem 1.5rem;
    font-family: Roboto;
    font-size: 1.5rem;
    outline: none;
    color: ${(props) => props.theme.colors.borderColor};
    @media screen and (max-width: 700px) {
     font-size: 1rem;
  }
`



const Title = ({title}) => {
return  <StyledTitle>{title}</StyledTitle>;
};

export default Title
