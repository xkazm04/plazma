import React from 'react'
import styled from 'styled-components'


const StyledButton = styled.button` 

    font-size: ${props => props.theme.fonts.p};
    outline: none;
    position: relative;
    padding: .2rem;
    font-family: 'Inter';
    font-size: 0.9rem;
    text-align: center;
    color: inherit;
    border: none;
    background-color: inherit;
    border-radius: 4px;
    cursor: pointer;
    width: ${props => props.width || '20rem'};
    transition-duration: 0.4s;
    &:hover{
        text-decoration: underline;
        transition-duration: 0.2s;
    }
    @media screen and (max-width: 700px) {
     font-size: 0.8rem;
     width: 100%;
     }

`



const LinkButton = ({ onClick, width, label}) => {
return  <StyledButton 
            onClick={onClick}
            width={width}
            >{label}</StyledButton>;
};

export default LinkButton
