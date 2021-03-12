import React from 'react'
import styled from 'styled-components'


const StyledButton = styled.button` 
    padding: 1rem 1.5rem;
    font-size: ${props => props.theme.fonts.p};
    outline: none;
    position: relative;
    padding: .5rem;
    font-weight: bold;
    font-family: Roboto;
    font-size: 0.8rem;
    text-align: center;
    height: 50px;
    border: none;
    border-bottom: 3px solid ${ (props) => (props.active ? props.theme.Primary.Main : props.theme.Primitive.Shade )};
    cursor: pointer;
    color:  ${ (props) => (props.active ? props.theme.Primary.Main : props.theme.colors.text )};
    background-color: ${props => props.theme.colors.blackWhite};
    /* Setting defualt width if not passed in props */
    width: ${props => props.width || '10rem'};
    &:hover{
        transition-duration: 0.2s;
        color: ${props => props.theme.colors.text};
        background-color: ${ (props) => (props.active ? null  : props.theme.colors.input)};
    }
`

const ToggleButton = ({ onClick, width, label, active}) => {
return  <StyledButton 
            active={active}
            onClick={onClick}
            width={width}
            >{label}</StyledButton>;
};

export default ToggleButton
