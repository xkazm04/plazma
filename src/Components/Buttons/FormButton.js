import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button` 
    margin: 0.2rem;
    margin-top: 2%;
    outline: none;
    color: ${props => props.theme.colors.text};
    background: linear-gradient(45deg, 
        ${props => props.theme.colors.gradient.first}, 
        ${props => props.theme.colors.gradient.second}
        );
        
    position: relative;
    padding: .5rem;
    font-weight: bold;
    font-size: 0.8rem;
    font-family: Roboto;
    text-align: center;
    border: 1px solid ${props => props.theme.colors.borderColor};
    border-radius: 4px;
    cursor: pointer;
    width: ${props => props.width || '14rem'};
    height: ${props => props.height || '2.5rem'};
    animation: 2s ease-in;
    transition-duration: 0.4s;
    &:hover{
        color: ${props => props.theme.colors.text};
        background: ${props => props.theme.colors.slotInput};
    }
    @media screen and (max-width: 700px) {
     font-size: 0.8rem;
     width: 100%;
     }

`

const FormButton = ({ onClick, width, label}) => {
return  <StyledButton 
            onClick={onClick}
            width={width}
            >{label}</StyledButton>;
};

export default FormButton
