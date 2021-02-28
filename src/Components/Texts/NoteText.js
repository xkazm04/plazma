import React from 'react'
import styled from 'styled-components'

const StyledNote = styled.p`
    color: ${(props) => props.theme.colors.font.paragraphText};
    font-family: Roboto;
    font-weight: ${(props) => props.fontWeight};
    font-style: italic;
    font-size: 10px;
    @media screen and (max-width: 700px) {
     font-size: 0.7rem;
  }
`


const NoteText = ({fontStyle, fontWeight, content}) => {
    return  <StyledNote fontStyle={fontStyle} fontWeight={fontWeight} >{content}</StyledNote>;
    };
    
    export default NoteText
    