import React from 'react'
import styled from 'styled-components'


const StyledButton = styled.button` 
    margin: 0.2rem;
    margin-top: 40px;
    padding: .5rem;
    outline: none;
    color: ${props => props.theme.colors.blackWhite};
    background: ${props =>  props.color || props.theme.Primary.Main};
    position: relative;
    z-index: 4;
    font-size: 0.9rem;
    font-family: Roboto;
    text-align: center;
    font-weight: 600;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: ${props => props.width || '14rem'};
    height: ${props => props.height || '2.5rem'};
    transition-duration: 0.2s;
    &:hover{
        background: ${props =>  props.hoverColor || props.theme.Primary.Hover};
    }
    @media screen and (max-width: 700px) {
     font-size: 0.8rem;
     width: 100%;
     }
`

const FilledButton = ({ onClick,height, width, label, color,hoverColor}) => {
return  <StyledButton
            onClick={onClick}
            width={width}
            color={color}
            hoverColor={hoverColor}
            height={height}
            >{label}</StyledButton>;
};

export default FilledButton
