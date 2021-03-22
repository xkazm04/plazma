import React from 'react'
import styled from 'styled-components'

const StyledTitle = styled.h1` 
    margin: 1rem 1.5rem;
    font-family: Roboto;
    font-size: 28px;
    font-weight: 500;
    outline: none;
    color: ${(props) => props.theme.colors.font.paragraphText};
    text-decoration:  ${props => props.theme.colors.text};
    @media screen and (max-width: 700px) {
     font-size: 1rem;
     margin-left: 0;
  }
`



const Title = ({title}) => {
return  <StyledTitle>{title}</StyledTitle>;
};

export default Title
