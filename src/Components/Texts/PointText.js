import React from 'react'
import styled from 'styled-components'

const StyledLi = styled.li`
    color: ${(props) => props.theme.colors.font.paragraphText};
    font-family: Roboto;
    font-weight: medium;
    text-decoration:${(props) => props.paragraphText};
    @media screen and (max-width: 700px) {
     font-size: 0.7rem;
  }
`


const Point = ({fontStyle, fontWeight, content}) => {
    return  <StyledLi fontStyle={fontStyle} fontWeight={fontWeight}  >{content}</StyledLi>;
    };
    
    export default Point
    