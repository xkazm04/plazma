import React from 'react'
import styled from 'styled-components'

const StyledP = styled.p`
    color: ${(props) => props.theme.colors.font.paragraphText};
    font-family: Roboto;
    font-weight: 700;
    font-style:${(props) => props.fontStyle};
    margin-bottom: 10%;
    @media screen and (max-width: 700px) {
     font-size: 0.8rem;
  }
`


const ParagraphText = ({fontStyle, content}) => {
    return  <StyledP fontStyle={fontStyle} >{content}</StyledP>;
    };
    
    export default ParagraphText
    