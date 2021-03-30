import React from 'react'
import styled from 'styled-components'


const StyledButton = styled.button` 
    margin-top: 1rem;
    outline: none;
    position: relative;
    font-weight: ${ (props) => (props.active ? 800 : 500 )};
    font-family: Roboto;
    font-size: 18px;
    text-align: center;
    height: 60px;
    border: none;
    border-bottom: 4px solid ${ (props) => (props.active ? props.theme.Primary.Main : props.theme.Primitive.Shade )};
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
    @media screen and (max-width: 700px) {
    font-size: 0.9rem;
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
