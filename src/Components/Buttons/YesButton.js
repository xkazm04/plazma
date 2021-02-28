import React from 'react'
import styled from 'styled-components'


const StyledButton = styled.button` 
    padding: 1rem 1.5rem;
    margin: 0.2rem;
    outline: none;
    background-color: #ecffeb;
    color: ${props => props.theme.colors.text};
    position: relative;
    padding: .5rem;
    font-weight: bold;
    font-size: 0.8rem;
    font-family: Roboto;
    text-align: center;
    border: 1px solid ${props => props.theme.colors.borderColor};
    border-radius: 5rem;
    cursor: pointer;
    width: ${props => props.width || '10rem'};
    animation: 2s ease-in;
    transition-duration: 0.4s;
    &:hover{
        color: ${props => props.theme.colors.text};
        background: ${props => props.theme.colors.slotInput};
    }

`



const FormButton = ({ onClick, width, label}) => {
return  <StyledButton 
            onClick={onClick}
            width={width}
            >{label}</StyledButton>;
};

export default FormButton
