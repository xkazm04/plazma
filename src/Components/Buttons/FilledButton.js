import React from 'react'
import styled from 'styled-components'


const StyledButton = styled.button` 
    margin: 0.2rem;
    margin-top: 4%;
    outline: none;
    color: ${props => props.theme.colors.blackWhite};
    background: ${props =>  props.color || props.theme.Primary.Main};
    position: relative;
    z-index: 4;
    padding: .5rem;
    font-size: 0.9rem;
    font-family: Roboto;
    text-align: center;
    font-weight: 600;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: ${props => props.width || '14rem'};
    height: ${props => props.height || '2.5rem'};
    animation: 2s ease-in;
    transition-duration: 0.4s;
    &:hover{
        color: ${props => props.theme.Primary.Main};
        background: ${props => props.theme.colors.slotInput};
    }
    @media screen and (max-width: 700px) {
     font-size: 0.8rem;
     width: 100%;

     }
`



const FilledButton = ({ onClick,height, width, label, color}) => {
return  <StyledButton
            onClick={onClick}
            width={width}
            color={color}
            height={height}
            >{label}</StyledButton>;
};

export default FilledButton
