import React from 'react'
import styled from 'styled-components'


const StyledButton = styled.button` 

    font-size: ${props => props.theme.fonts.p};
    outline: none;
    position: relative;
    font-family: Inter;
    font-size: 14px;
    text-align: center;
    border: none;
    background-color: inherit;
    border-radius: 4px;
    color: ${props => props.theme.Primary.Main};
    cursor: pointer;
    transition-duration: 0.4s;
    &:hover{
        text-decoration: underline;
        transition-duration: 0.2s;
    }
    @media screen and (max-width: 700px) {
     font-size: 10px;
     }

`



const LinkButton = ({ onClick, width, label}) => {
return  <StyledButton 
            onClick={onClick}
            width={width}
            >{label}</StyledButton>;
};

export default LinkButton
