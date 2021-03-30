import React from 'react'
import styled from 'styled-components'


const StyledButton = styled.button` 
    margin: 0.2rem;
    margin-top: 40px;
    padding: .5rem;
    outline: none;
    color: ${props => props.theme.colors.blackWhite};
    background: ${props =>  props.color || props.theme.Primitive.Shade};
    position: relative;
    font-size: 0.9rem;
    font-family: Roboto;
    text-align: center;
    opacity: 0.3;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: ${props => props.width || '14rem'};
    animation: 2s ease-in;
    transition-duration: 0.4s;

    @media screen and (max-width: 700px) {
     font-size: 0.8rem;
     width: 100%;
     }

`

const DisabledButton = ({ width, label, color}) => {
return  <StyledButton 
            disabled
            color={color}
            width={width}
            >{label}</StyledButton>;
};

export default DisabledButton
