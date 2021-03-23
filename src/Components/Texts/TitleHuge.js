import React from 'react'
import styled from 'styled-components'

const StyledTitle = styled.h1` 
    margin-bottom: 1rem;
    font-family: Roboto;
    font-size: 36px;
    font-weight: 600;
    letter-spacing: -0.01em;
    outline: none;
    color: #0B3A3D;
    text-decoration:  ${props => props.theme.colors.text};
    @media screen and (max-width: 700px) {
     font-size: 1rem;
  }
`



const TitleHuge = ({title}) => {
return  <StyledTitle>{title}</StyledTitle>;
};

export default TitleHuge
