import React from 'react'
import styled from 'styled-components'


const StyledButton = styled.button` 
    margin: 0.2rem;
    margin-top: 4%;
    outline: none;
    color: ${props => props.theme.Secondary.Main};
    background: ${props => props.theme.colors.blackWhite};
    position: relative;
    z-index: 4;
    padding: .5rem;
    font-weight: bold;
    font-size: 0.9rem;
    font-family: Roboto;
    text-align: center;
    border: 1px solid ${props => props.theme.Secondary.Main};
    border-radius: 4px;
    cursor: pointer;
    width: ${props => props.width || '14rem'};
    height: ${props => props.height || '2.5rem'};
    animation: 2s ease-in;
    transition-duration: 0.4s;
    &:hover{
        color: ${props => props.theme.colors.blackWhite};
        background: ${props => props.theme.Secondary.Main};
    }
    @media screen and (max-width: 700px) {
     font-size: 0.8rem;
     width: 100%;
     }

`



const RegisterButton = ({ onClick, width, label, disabled}) => {
return  <StyledButton 
            disabled={disabled}
            onClick={onClick}
            width={width}
            >{label}</StyledButton>;
};

export default RegisterButton
