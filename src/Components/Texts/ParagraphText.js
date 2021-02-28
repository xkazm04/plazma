import React from 'react'
import styled from 'styled-components'

const StyledP = styled.p`
    color: ${(props) => props.theme.colors.font.paragraphText};
    font-family: Roboto;
    font-weight: ${(props) => props.fontWeight};
    font-style:${(props) => props.fontStyle};
    @media screen and (max-width: 700px) {
     font-size: 0.8rem;
  }
`


const ParagraphText = ({fontStyle, fontWeight, content}) => {
    return  <StyledP fontStyle={fontStyle} fontWeight={fontWeight} >{content}</StyledP>;
    };
    
    export default ParagraphText
    